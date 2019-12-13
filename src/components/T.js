import * as React from "react";
import _Table from "rc-table";
import styled from "styled-components";

import { ChevronUp } from "react-feather";
import { ChevronDown } from "react-feather";
import { Box } from "./Box";

import compare from "array-sort";

const ASCENDING = "ascending";
const DESCENDING = "descending";

const StyledTable = styled.table`
  font-family: "Red Hat Text";
  border-collapse: collapse;
  width: 100%;
`;

const StyledTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  padding: 24px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--elevation2);
`;

const StyledTableTitle = styled.h3`
  margin-bottom: 16px;
`;

const StyledTableBody = styled.tbody`
  :hover tr:hover + tr {
    opacity: 0.8;
  }

  :hover tr:hover + tr + tr {
    opacity: 0.6;
  }

  :hover tr:not(:hover) {
    opacity: 0.4;
  }
`;

const StyledTableHead = styled.thead`
  padding: 0 12px;
`;

const StyledTableHeadCell = styled.th`
  padding: 12px 24px 12px 8px;
  text-align: left;
  cursor: ${props => (props.isSortable ? "pointer" : "inherit")};
`;

const SortIcon = props => {
  const upColor =
    props.isSorted && props.sortDirection === ASCENDING
      ? "var(--brandDarkPurple)"
      : "var(--grayscale6)";

  const downColor =
    props.isSorted && props.sortDirection === DESCENDING
      ? "var(--brandDarkPurple)"
      : "var(--grayscale6)";

  return (
    <Box
      inline
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bottom="5px"
      left="2px"
    >
      <ChevronUp size={10} color={upColor} />
      <ChevronDown size={10} color={downColor} />
    </Box>
  );
};

const TableHeadCellContainer = props => {
  const setSortFilter = () => {
    if (props.isSorted) {
      const direction =
        props.sortDirection === ASCENDING ? DESCENDING : ASCENDING;
      return props.setSortFilter([props.dataIndex, direction]);
    }

    props.setSortFilter([props.dataIndex, ASCENDING]);
  };

  return (
    <StyledTableHeadCell {...props} onClick={setSortFilter}>
      {props.children} {props.isSortable && <SortIcon {...props} />}
    </StyledTableHeadCell>
  );
};

const StyledTableHeadRow = styled.tr`
  padding-bottom: 24px;
  user-select: none;
`;

const StyledTableBodyCell = styled.td`
  padding: 12px 24px 12px 8px;
  text-align: left;
  font-weight: 400;
`;

const StyledTableBodyRow = styled.tr`
  padding-bottom: 24px;
  transition: all 0.1s;

  background: rgba(255, 255, 255, 0);
  outline: 1px solid var(--grayscale0);

  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0);
  :hover {
    background: var(--grayscale0);
    outline: 1px solid var(--brandDarkPurple);
    outline-offset: 1px;
  }
`;

const components = {
  table: StyledTable,
  header: {
    wrapper: StyledTableHead,
    row: StyledTableHeadRow,
    cell: TableHeadCellContainer
  },
  body: {
    wrapper: StyledTableBody,
    row: StyledTableBodyRow,
    cell: StyledTableBodyCell
  }
};

const useColumnsEnhancer = (props, sortFilter, setSortFilter) => {
  const [columns, setColumns] = React.useState(props.columns);

  React.useEffect(() => {
    const markColumnAsSortable = column => {
      const isSorted = sortFilter[0] === column.dataIndex;
      const sortDirection = isSorted ? sortFilter[1] : undefined;

      return {
        ...column,
        onCell: record => {
          if (props.onRowClick) {
            return {
              onClick: () => props.onRowClick(record)
            };
          }

          return {};
        },
        onHeaderCell: record => {
          return {
            dataIndex: column.dataIndex,
            title: column.title,
            isSortable: column.isSortable,
            isSorted,
            sortDirection,
            setSortFilter: filter => {
              setSortFilter(filter);
            }
          };
        }
      };
    };

    setColumns(columns.map(markColumnAsSortable));
  }, [props.columns, ...sortFilter]);

  return columns;
};

const reorderRows = (rows, direction) => {
  return direction === ASCENDING ? rows : rows.reverse();
};

const useTableState = props => {
  const [sortFilter, setSortFilter] = React.useState(["ParcelID", ASCENDING]);
  const columns = useColumnsEnhancer(props, sortFilter, setSortFilter);

  return {
    rows: reorderRows(compare(props.data, sortFilter[0]), sortFilter[1]),
    columns
  };
};

export const Table = props => {
  const state = useTableState(props);

  return (
    <StyledTableContainer>
      <StyledTableTitle>{props.title}</StyledTableTitle>
      <_Table
        columns={state.columns}
        data={state.rows}
        components={components}
        onRowClick={props.onRowClick}
      />
    </StyledTableContainer>
  );
};
