import * as React from "react"
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

import { useUID } from "../hooks/useUID"

// TODO: Dynamic tbody height.

// TODO: Column overrides.

// TODO: Custom columns from level 3 usage.

// NOTE: Tables come in 3 levels.
// - Level 1 is this component, the core table component.
// It houses all basic functionality to allow tables to
// be created.
// - Level 2 consists of tables created to be reused in Overdrive's
// web properties, providing the added layer of logic needed to
// handle specific table cases. (i.e Title table, Parcel table.)
// - Level 3 consists of custom level 2 tables. These tables are,
// essentially, level 2 tables with custom column definitions and
// capabilities. (i.e Title table with only ID and Grantor columns.)

// NOTE: Tables are always the last render of the parent/page.

const Styles = styled.div`
  display: block;
  max-width: 100%;
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

const StyledTHead = styled.div`
  width: 100%;
  padding: 24px 0 24px;
  border-bottom: 1px solid var(--grayscale2);
  box-shadow: 0px -2px 8px 0px var(--lightPurple2);
  border-top: 1px solid var(--grayscale2);

  .th:first-of-type {
    padding-left: 24px;
  }
`

const StyledTH = styled.div`
  font-weight: 600;
  user-select: none;
  font-size: 14px;
`

const StyledTable = styled.div`
  width: fit-content;
  width: 100%;

  .tr {
    padding: 8px 0;
    width: 100%;
  }
`

const StyledTableTitle = styled.h3`
  width: 100%;
`

const StyledTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  position: relative;
  z-index: 50;
  background: #fff;
  width: 100%;
`

const StyledTD = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  font-weight: ${(props) => (props.onClick ? "500" : "400")};
  color: ${(props) => (props.onClick ? "var(--brandLightPurple)" : "inherit")};
  cursor: ${(props) => (props.onClick ? "pointer" : "inherit")};

  width: 1%;

  /* But "collapsed" cells should be as small as possible */
  &.collapse {
    width: 0.0000000001%;
  }
`

const TableBody = styled.div`
  width: 100% !important;
  height: ${(props) => props.tableHeight}px;

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

const StyledTableWrapper = styled.div`
  display: block;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`

const TOPBAR_HEIGHT = 68
const TABLE_TITLE_BAR_HEIGHT = 82
const TABLE_COLUMNS_HEADER_HEIGHT = 66
const PAGE_Y_PADDING_HEIGHT = 64

const TOTAL_ANCESTRY_HEIGHT =
  TOPBAR_HEIGHT +
  TABLE_TITLE_BAR_HEIGHT +
  TABLE_COLUMNS_HEADER_HEIGHT +
  PAGE_Y_PADDING_HEIGHT

const useAvailableHeight = (uid, rowCount) => {
  const [tableHeight, setTableHeight] = React.useState(0)

  React.useEffect(() => {
    console.log("getting height...")
    const rowsHeight = rowCount * 45
    const { innerHeight } = window

    const table = document.querySelector(`[data-uid="${uid}"]`)
    const parent = table.parentNode
    const children = Array.from(parent.children)

    const tableHeight = children.reduce((final, child) => {
      if (child === table) {
        return final
      }

      return final - Number(child.offsetHeight)
    }, innerHeight)

    const newTableHeight = tableHeight - TOTAL_ANCESTRY_HEIGHT
    console.log({ newTableHeight, rowsHeight })
    setTableHeight(newTableHeight < rowsHeight ? newTableHeight : rowsHeight)
  }, [rowCount])

  return tableHeight
}

export const Table = (props) => {
  const uid = useUID()

  const tableState = useTable(
    {
      columns: props.columns,
      data: props.data || [],
    },
    useSortBy,
    useAbsoluteLayout
  )

  console.log({ tableState })

  const height = useAvailableHeight(uid, tableState.rows.length)

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = tableState.rows[index]
      tableState.prepareRow(row)

      const trProps = row.getRowProps({
        style,
      })

      return (
        <div {...trProps} className="tr">
          {row.cells.map((cell) => {
            const cellProps = {
              ...cell.getCellProps({
                className: cell.column.collapse ? "collapse td" : "td",
              }),
            }

            const { onClick } = cell.column

            return (
              <StyledTD
                {...cellProps}
                onClick={onClick ? () => onClick(cell) : undefined}
              >
                {cell.render("Cell")}
              </StyledTD>
            )
          })}
        </div>
      )
    },
    [tableState.prepareRow, tableState.rows]
  )

  return (
    <Styles data-common-component="Table" data-uid={uid}>
      <StyledTopRow>
        <StyledTableTitle>{props.title}</StyledTableTitle>
        {props.renderTopRow && props.renderTopRow(props, tableState)}
      </StyledTopRow>
      <StyledTableWrapper>
        <StyledTable {...tableState.getTableProps()} className="table">
          <StyledTHead className="thead">
            {tableState.headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <StyledTH
                    {...column.getHeaderProps({
                      ...column.getSortByToggleProps(),
                      className: column.collapse ? "collapse th" : "th",
                    })}
                  >
                    {column.render("Header")}{" "}
                    <span>
                      <SortIcons {...column} />
                    </span>
                  </StyledTH>
                ))}
              </div>
            ))}
          </StyledTHead>

          <TableBody
            {...tableState.getTableBodyProps()}
            tableHeight={height}
            className="tbody"
          >
            <FixedSizeList
              className="virtualizedTable"
              height={height || 300}
              itemCount={tableState.rows.length}
              itemSize={45}
              width="100%"
            >
              {RenderRow}
            </FixedSizeList>
          </TableBody>
        </StyledTable>
      </StyledTableWrapper>
    </Styles>
  )
}
