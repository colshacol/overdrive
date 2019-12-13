import React from "react";
import ReactDOM from "react-dom";

import {
  Text,
  Page,
  Button,
  Stack,
  Sidebar,
  Card,
  Layout,
  Frame,
  Icon,
  Avatar,
  SideNav,
  Breadcrumb
} from "@servicetitan/design-system";

import theme from "./theme.json";

import DynamicTable from "@atlaskit/dynamic-table";

const createTableHeaders = headers => {
  return {
    cells: headers.cells.map(cell => {
      return {
        ...cell,
        content: (
          <Text size={3} bold style={{ userSelect: "none" }}>
            {cell.content}
          </Text>
        )
      };
    })
  };
};

const TABLE_HEADERS = createTableHeaders({
  cells: [
    {
      content: "Parcel ID",
      isSortable: true,
      key: "parcelID",
      width: 8,
      className: "atlaskitTableHeader parcelID"
    },
    {
      content: "Parcel Number",
      isSortable: true,
      key: "parcelNumber",
      width: 16,
      className: "atlaskitTableHeader parcelNumber"
    },
    {
      content: "Status",
      isSortable: true,
      key: "status",
      width: 5,
      className: "atlaskitTableHeader status"
    },
    {
      content: "APN",
      isSortable: true,
      key: "apn",
      width: 14,
      className: "atlaskitTableHeader apn"
    },
    {
      content: "Acres",
      isSortable: true,
      key: "acres",
      width: 5,
      className: "atlaskitTableHeader acres"
    },
    {
      content: "Assigned To",
      isSortable: true,
      shouldTruncate: true,
      key: "assignedTo",
      width: 9.5,
      className: "atlaskitTableHeader assignedTo"
    },
    {
      content: "Date Assigned",
      isSortable: true,
      key: "dateAssigned",
      width: 10,
      className: "atlaskitTableHeader dateAssigned"
    },
    {
      content: "Date Completed",
      isSortable: true,
      key: "dateCompleted",
      width: 10.5,
      className: "atlaskitTableHeader dateCompleted"
    }
  ]
});

const createTableRows = rows => {
  return rows.map(row => {
    return {
      ...row,
      cells: row.cells.map(cell => {
        return {
          ...cell,
          content: (
            <Text size={2} className="p-t-half p-b-half">
              {cell.content}
            </Text>
          )
        };
      })
    };
  });
};

const TABLE_ROWS = createTableRows([
  {
    key: "row-320-006-02-01-0013-00",
    className: "atlaskitTableRow",
    cells: [
      {
        content: "937237163",
        key: "row-320-006-02-01-0013-00-parcelID"
      },
      {
        content: "42-125-320-006-04-00-0012-00",
        key: "row-320-006-02-01-0013-00-parcelNumber"
      },
      {
        content: (
          <Icon name="check" className="m-l-half m-b-half" size="16px" />
        ),
        key: "row-320-006-02-01-0013-00-status"
      },
      {
        content: "320-006-02-01-0013-00",
        key: "row-320-006-02-01-0013-00-apn"
      },
      {
        content: "0",
        key: "row-320-006-02-01-0013-00-acres"
      },
      {
        content: "Bobby Darin",
        key: "row-320-006-02-01-0013-00-assignedTo"
      },
      {
        content: "03/14/2019",
        key: "row-320-006-02-01-0013-00-dateAssigned"
      },
      {
        content: "04/01/2019",
        key: "row-320-006-02-01-0013-00-dateCompleted"
      }
    ]
  },
  {
    key: "row-320-008-00-00-0041-00",
    className: "atlaskitTableRow",
    cells: [
      {
        content: "937236879",
        key: "row-320-008-00-00-0041-00-parcelID"
      },
      {
        content: "42-125-320-006-03-02-0022-00",
        key: "row-320-008-00-00-0041-00-parcelNumber"
      },
      {
        content: (
          <Icon name="check" className="m-l-half m-b-half" size="16px" />
        ),
        key: "row-320-008-00-00-0041-00-status"
      },
      {
        content: "320-008-00-00-0041-00",
        key: "row-320-008-00-00-0041-00-apn"
      },
      {
        content: "975",
        key: "row-320-008-00-00-0041-00-acres"
      },
      {
        content: "Jessica Parker",
        key: "row-320-008-00-00-0041-00-assignedTo"
      },
      {
        content: "01/07/1990",
        key: "row-320-008-00-00-0041-00-dateAssigned"
      },
      {
        content: "12/20/1993",
        key: "row-320-008-00-00-0041-00-dateCompleted"
      }
    ]
  },
  {
    key: "row-320-006-03-02-0019-00",
    className: "atlaskitTableRow",
    cells: [
      {
        content: "937237146",
        key: "row-320-006-03-02-0019-00-parcelID"
      },
      {
        content: "42-125-320-006-03-02-0019-00",
        key: "row-320-006-03-02-0019-00-parcelNumber"
      },
      {
        content: (
          <Icon name="close" className="m-l-half m-b-half" size="16px" />
        ),
        key: "row-320-006-03-02-0019-00-status"
      },
      {
        content: "320-006-03-02-0019-00",
        key: "row-320-006-03-02-0019-00-apn"
      },
      {
        content: "1,594",
        key: "row-320-006-03-02-0019-00-acres"
      },
      {
        content: "Davey Jones",
        key: "row-320-006-03-02-0019-00-assignedTo"
      },
      {
        content: "09/27/2016",
        key: "row-320-006-03-02-0019-00-dateAssigned"
      },
      {
        content: "n/a",
        key: "row-320-006-03-02-0019-00-dateCompleted"
      }
    ]
  }
]);

export const ParcelsTable = props => {
  const [sortKey, setSortKey] = React.useState("parcelID");
  const [sortOrder, setSortOrder] = React.useState("ASC");

  const sort = event => {
    console.log(event);
    setSortKey(event.key);
    setSortOrder(event.sortOrder);
  };

  console.log({ sortOrder, sortKey });

  return (
    <DynamicTable
      data-component="table"
      className="atlaskitTable"
      caption={
        <Text size={6} bold className="atlaskitTableCaption">
          Parcel Activity
        </Text>
      }
      head={TABLE_HEADERS}
      rows={TABLE_ROWS}
      rowsPerPage={10}
      defaultPage={1}
      loadingSpinnerSize="large"
      isLoading={false}
      // sortKey={sortKey}
      // sortOrder={sortOrder}
      defaultSortKey="parcelID"
      defaultSortOrder="ASC"
      // onSort={sort}
      // onSetPage={sort}
    />
  );
};
