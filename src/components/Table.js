import * as React from "react"
// import * as ReactTable from 'react-table'
import styled from "styled-components"
import { FixedSizeList } from "react-window"

import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
  useBlockLayout,
  useResizeColumns,
  useAbsoluteLayout,
} from "react-table"

import { ChevronUp } from "react-feather"
import { ChevronDown } from "react-feather"
import { Spacer } from "./Spacer"

const Styles = styled.div`
  width: 100%;
  height: fit-content;
  background: #fff;
  border-radius: 6px;
  overflow-y: hidden;
  box-shadow: 0px 2px 12px -4px var(--darkPurple2);
  transition: all 0.25s;
  border: 1px solid var(--darkPurple2);
  border-bottom: 2px solid var(--grayscale4);
`

const THead = styled.div`
  padding: 24px 0 24px;
  /* border-radius: 6px; */
  border-bottom: 1px solid var(--grayscale2);
  box-shadow: 0px -2px 8px 0px var(--lightPurple2);
  border-top: 1px solid var(--grayscale2);
  .th:first-of-type {
    padding-left: 24px;
  }
`

const TH = styled.div`
  font-weight: 600;
  user-select: none;
  font-size: 14px;
`

const StyledTable = styled.div`
  display: inline-block;
  width: 100%;

  .tr {
    padding: 8px 0;
    width: 100%;
  }
`

const StyledTableTitle = styled.h3`
  min-width: 250px;
`

const StyledTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  position: relative;
  z-index: 50;
  background: #fff;
`

const TD = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  font-weight: ${(props) => (props.onClick ? "500" : "400")};
  color: ${(props) => (props.onClick ? "var(--brandLightPurple)" : "inherit")};
  cursor: ${(props) => (props.onClick ? "pointer" : "inherit")};
`

const TableBody = styled.div`
  width: 100% !important;

  .tr {
    background: hsla(300, 15%, 98%, 1);
    border-bottom: 1px solid var(--grayscale2);
  }

  .tr .td {
    font-size: 14px;
  }

  .tr .td:first-of-type {
    padding-left: 24px;
  }

  .tr .td:last-of-type {
    padding-right: 24px;
  }

  .tr:not(:last-of-type) {
  }

  .tr:hover {
    outline: 1px solid #8734a505;
    background-image: linear-gradient(25deg, #faedffb0, #eed4f71f);
  }

  > div {
    overflow-x: hidden !important;
  }
`

const SortIcons = (props) => {
  return props.isSorted ? (
    props.isSortedDesc ? (
      <ChevronDown
        size={16}
        style={{ position: "relative", top: 3 }}
        color="var(--brandDarkPurple)"
      />
    ) : (
      <ChevronUp
        size={16}
        style={{ position: "relative", top: 3 }}
        color="var(--brandDarkPurple)"
      />
    )
  ) : (
    ""
  )
}

export const Table = (props) => {
  const tableState = useTable(
    {
      columns: props.columns,
      data: props.data || [],
    },
    useSortBy,
    useAbsoluteLayout
  )

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = tableState.rows[index]
      tableState.prepareRow(row)

      const trProps = row.getRowProps({
        style,
      })

      // console.log(row, trProps);

      return (
        <div {...trProps} className="tr">
          {row.cells.map((cell) => {
            const cellProps = cell.getCellProps()
            const { onClick } = cell.column

            return (
              <TD
                {...cellProps}
                onClick={onClick ? () => onClick(cell) : undefined}
                className="td"
              >
                {cell.render("Cell")}
              </TD>
            )
          })}
        </div>
      )
    },
    [tableState.prepareRow, tableState.rows]
  )

  return (
    <Styles>
      <StyledTopRow>
        <StyledTableTitle>{props.title}</StyledTableTitle>
        {props.renderTopRow && props.renderTopRow(props, tableState)}
      </StyledTopRow>
      <StyledTable {...tableState.getTableProps()} className="table">
        <THead className="thead">
          {tableState.headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <TH
                  className="th"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}{" "}
                  <span>
                    <SortIcons {...column} />
                  </span>
                </TH>
              ))}
            </div>
          ))}
        </THead>

        <TableBody {...tableState.getTableBodyProps()} className="tbody">
          <FixedSizeList
            className="virtualizedTable"
            height={props.height || 450}
            itemCount={tableState.rows.length}
            itemSize={45}
            width="100%"
          >
            {RenderRow}
          </FixedSizeList>
        </TableBody>
      </StyledTable>
    </Styles>
  )
}
