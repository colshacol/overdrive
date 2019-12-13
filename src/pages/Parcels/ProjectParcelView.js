import * as React from "react";
import { Grid, Cell } from "styled-css-grid";
import { User } from "react-feather";
import { SimpleDataCard } from "../../components/SimpleDataCard";
import { Page } from "../../components/Page";
import { Spacer } from "../../components/Spacer";
import { ParcelDataCards } from "./ParcelDataCards";
import { Box } from "../../components/Box";
import truncate from "truncate";

import styled from "styled-components";
import theme from "../../theme";
import { SmallLabel } from "../../components/SmallLabel";
import { Breadcrumb } from "@servicetitan/design-system";
import { useBreadcrumb } from "../../hooks/useBreadcrumbs";
import { useRoute, useLocation, Route, Switch } from "wouter";

import { Plus } from "react-feather";
import Popup from "reactjs-popup";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";

import { useTitles } from "../../hooks/useTitles";
import { useParcel } from "../../hooks/useParcel";

import * as Breadcrumbs from "../../components/Breadcrumbs";
import { ProjectParcelTitleView } from "./ProjectParcelTitleView";
import { useGlobalStore } from "../../global.store";
import { TextInput } from "../../components/TextInput";
// import { Grid, Cell } from "styled-css-grid";

const TitleTable = props => {
  const globalStore = useGlobalStore();
  const [location, setLocation] = useLocation();

  const columns = React.useRef([
    {
      Header: "ID",
      accessor: "TitleID",
      width: 80,
      onClick: cell => {
        globalStore.setCurrentTitleID(cell.value);
      }
    },
    {
      Header: "Status",
      accessor: "status",
      width: 120
      // onClick: cell => {
      //   setLocation(`${location}/${cell.value}`);
      // }
    },
    {
      Header: "Grantor",
      accessor: "Grantor",
      width: 230,
      Cell: ({ cell: { value } }) => truncate(value, 23)
    },
    {
      Header: "Grantee",
      accessor: "Grantee",
      width: 150
    },
    {
      Header: "Recorded Date",
      accessor: "RecordedDate",
      width: 200
    },
    {
      Header: "Effective Date",
      accessor: "EffectiveDate",
      width: 200
    },
    {
      Header: "Document Type",
      accessor: "DocumentType",
      width: 200
    }
  ]);

  return (
    <Table
      height={props.data.length * 45}
      title="Title Activity"
      columns={columns.current}
      data={props.data}
      renderTopRow={(props, tableState) => (
        <Box inline width="100%" justifyContent="flex-end" alignItems="center">
          <Popup
            trigger={
              <Button small>
                <Plus size="18px" style={{ marginRight: 6 }} />
                Add Title
              </Button>
            }
            modal
            closeOnDocumentClick
          >
            {close => <AddTitleModal close={close} />}
          </Popup>
        </Box>
      )}
    />
  );
};

const StyledDataText = styled.span`
  margin-right: 64px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  width: ${props => (props.longText ? "100%" : "auto")};
  padding: ${props => (props.longText ? "16px 0" : "0")};
  /* background: ${props => (props.longText ? "var(--grayscale0)" : "none")}; */

  span {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

const DataText = props => {
  return (
    <StyledDataText {...props}>
      <span>{props.label}</span>
      <p>{props.value}</p>
    </StyledDataText>
  );
};

const MutedText = styled.span`
  /* opacity: 0.5; */
  color: var(--grayscale7);
  font-weight: 400;
`;

export const ProjectParcelView = props => {
  const project = useCurrentProject();

  return (
    <>
      <Breadcrumbs.Crumb
        path={`/project/${project.ProjectID}/parcels/${props.params.parcelID}`}
        text={`Parcel (${props.params.parcelID})`}
      />
      <Switch>
        <Route
          path="/project/:projectID/parcels/:parcelID"
          component={ParcelView}
        />
        <Route
          path="/project/:projectID/parcels/:parcelID/title/:titleID"
          component={ProjectParcelTitleView}
        />
      </Switch>
    </>
  );
};

const ParcelView = props => {
  const titles = useTitles();
  const [, route] = useRoute("/project/:projectID/parcels/:parcelID");
  const parcel = useParcel(Number(props.params.parcelID));

  return (
    <>
      <h1>
        Parcel <MutedText>ID: {parcel.ParcelID}</MutedText>
      </h1>
      <Spacer size="32px" />
      <ParcelData parcel={parcel} />
      <TitleTable data={titles} />
    </>
  );
};

const ParcelData = ({ parcel }) => {
  return (
    <Box
      width="100%"
      padding="24px"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <DataText label="State" value={parcel.StateCode || "N/A"} />
      <DataText label="County" value={parcel.County || "N/A"} />
      <DataText label="Acres" value={parcel.Acres || "N/A"} />
      <DataText label="Parcel ID" value={parcel.ParcelID || "N/A"} />
      <DataText label="APN" value={parcel.APN || "N/A"} />
      <DataText label="Parcel Number" value={parcel.ParcelNumber || "N/A"} />
      <DataText label="Township Name" value={parcel.TownshipName || "N/A"} />
      <DataText label="Township" value={parcel.Township || "N/A"} />
      <DataText label="Range" value={parcel.Range || "N/A"} />
      <DataText label="Meridian" value={parcel.Meridian || "N/A"} />
      <DataText label="Address" value={parcel.Address || "N/A"} />
      <DataText label="City" value={parcel.City || "N/A"} />
      <DataText label="State" value={parcel.State || "N/A"} />
      <DataText label="Zip" value={parcel.Zip || "N/A"} />
      <Spacer size="16px" />
      <DataText label="Assigned To" value={parcel.AssignedTo || "N/A"} />
      <DataText
        style={{ width: "100%" }}
        label="Legal Description"
        value={parcel.LegalDescription || "N/A"}
      />
    </Box>
  );
};

const STATE_LABEL_MAP = {
  TitleID: { label: "Title ID", width: 1 },
  EmployeeID: { label: "Employee ID", width: 1 },
  RecordedDate: { label: "Recorded Date", width: 1 },
  CertificationDate: { label: "Certification Date", width: 1 },
  EffectiveDate: { label: "Effective Date", width: 1 },
  DocumentType: { label: "Document Type", width: 1 },
  DocumentName: { label: "Document Name", width: 1 },
  BookVolume: { label: "Book Volume", width: 1 },
  Page: { label: "Page", width: 1 },
  Acreage: { label: "Acreage", width: 1 },
  Grantor: { label: "Grantor", width: 2 },
  Grantee: { label: "Grantee", width: 2 },
  Conveyance: { label: "Conveyance", width: 2 },
  CreatedDate: { label: "Created Date", width: 2 },
  Mapped: { label: "Mapped", width: 2 },
  CreatedBy: { label: "Created By", width: 2 }
};

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  min-width: 900px;
  height: 100%;
  min-height: 700px;
  max-height: 800px;
  border-radius: 6px;
  padding: 48px;
  background: var(--grayscale0);
  overflow-y: scroll;
`;

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`;

const AddTitleModal = props => {
  const [state, setState] = React.useState({
    TitleID: "",
    EmployeeID: "",
    RecordedDate: "",
    CertificationDate: "",
    DocumentType: "",
    DocumentName: "",
    EffectiveDate: "",
    BookVolume: "",
    Page: "",
    Acreage: "",
    Grantor: "",
    Grantee: "",
    Conveyance: "",
    CreatedDate: "",
    CreatedBy: "",
    Mapped: ""
  });

  const onChange = key => event => {
    const { value } = event.target;
    setState(state => ({
      ...state,
      [key]: value
    }));
  };

  return (
    <StyledModal>
      <h2>Add Title</h2>
      <StyledForm>
        <Grid columns={2} gap="24px" style={{ width: "100%" }}>
          {Object.entries(state).map(([key, value]) => (
            <Cell width={STATE_LABEL_MAP[key].width}>
              <TextInput
                width="100%"
                label={STATE_LABEL_MAP[key].label}
                value={value}
                onChange={onChange(key)}
              />
            </Cell>
          ))}
        </Grid>
      </StyledForm>
      <StyledActionsRow>
        <Button.Ghost onClick={props.close}>Cancel</Button.Ghost>
        <Spacer size="24px" />
        <Button onClick={props.close}>Submit</Button>
      </StyledActionsRow>
    </StyledModal>
  );
};

const StyledActionsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
