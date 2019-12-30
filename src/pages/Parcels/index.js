import * as React from "react"
import { Page } from "../../components/Page"
import { Spacer } from "../../components/Spacer"
import { ParcelDataCards } from "./ParcelDataCards"
import { useRoute, useLocation, Route, Switch, Link } from "wouter"
import * as ProjectsStore from "../../projects.store"
import { useGlobalStore } from "../../global.store"
import { ParcelsTable } from "./ParcelsTable"
import sampleData from "../../sampleData.json"
import * as Breadcrumbs from "../../components/Breadcrumbs"
import { useProject } from "../../hooks/useProject"

const projectParcels = sampleData.parcels

const useCurrentProject = () => {
  const globalStore = useGlobalStore()
  const projectsStore = ProjectsStore.useProjects()
  const project = projectsStore.getProjectWithID(globalStore.currentProjectID)
  return project
}

export const ProjectParcelsView = (props) => {
  const project = useProject(props.params.projectID)

  return (
    <Page title={`${project.ProjectName}`}>
      <Breadcrumbs.Crumb
        path={`/project/${props.params.projectID}/parcels`}
        text="Parcels"
      />
      <h1>Parcels</h1>
      <Spacer size="16px" />
      <ParcelDataCards {...props} />
      <Spacer size="32px" />
      <ParcelsTable data={projectParcels} />
    </Page>
  )
}

// const List = props => {
//   return (
//     <>
//       <h4>{props.title}</h4>
//       <Spacer size="16px" />
//       <Box width="100%" borderRadius="6px" flexDirection="column">
//         {props.children}
//       </Box>
//     </>
//   );
// };

// List.Item = props => {
//   return (
//     <Box className="ListItem" width="100%" paddingY="16px">
//       {Object.entries(props.data).map(data => (
//         <List.Item.Space label={data[0]} value={data[1]} />
//       ))}
//     </Box>
//   );
// };

// List.Item.Space = props => {
//   return (
//     <Box paddingRight="48px" display="inline-flex" flexDirection="column">
//       <SmallLabel>{props.label}</SmallLabel>
//       <Spacer size="8px" />
//       <p>{props.value}</p>
//     </Box>
//   );
// };

// const Badge = props => {
//   return (
//     <Box className="ListItem" width="100%" paddingY="16px">
//       <Box
//         marginRight="48px"
//         paddingY="6px"
//         borderRadius="6px"
//         flexDirection="row"
//         flexWrap="nowrap"
//         alignItems="center"
//         background="#2270ee"
//         color="#fff"
//       >
//         <SmallLabel>Parcel ID: </SmallLabel>
//         <Spacer size="8px" />
//         <p>{props.id}</p>
//       </Box>
//     </Box>
//   );
// };

// const LIST_ITEM_SPACE_LABEL_STYLE = {
//   opacity: 0.8,
//   fontWeight: 400,
//   // fontSize: "1.3rem",
//   letterSpacing: 1
// };

// const LIST_ITEM_SPACE_VALUE_STYLE = {
//   fontWeight: 500,
//   // fontSize: "1.3rem",
//   letterSpacing: 1
// };

// const ParcelListItemSpace = props => {
//   return (
//     <Box marginRight="48px" paddingY="6px" alignItems="center">
//       {typeof props.label === "string" ? (
//         <p style={LIST_ITEM_SPACE_LABEL_STYLE}>{props.label}:</p>
//       ) : (
//         props.label
//       )}
//       <Spacer size="8px" />
//       <p style={LIST_ITEM_SPACE_VALUE_STYLE}>{props.value}</p>
//     </Box>
//   );
// };

// const ParcelListItemIdSpace = props => {
//   return (
//     <Box marginRight="48px" paddingY="6px">
//       <h4 style={{ opacity: 0.5, fontWeight: 500 }}>ID: </h4>
//       <Spacer size="8px" />
//       <h4>{props.id}</h4>
//     </Box>
//   );
// };

// const ParcelListItem = props => {
//   return (
//     <Box
//       className="ListItem"
//       width="100%"
//       paddingY="16px"
//       paddingX="24px"
//       marginBottom="16px"
//       background="#ffffff"
//       flexDirection="column"
//     >
//       <Box>
//         <ParcelListItemIdSpace id={props.id} />
//         <ParcelListItemSpace label="Number" value={props.number} />
//         <ParcelListItemSpace label="APN" value={props.apn} />
//         <ParcelListItemSpace label="Acres" value={props.acres} />
//       </Box>
//       <Box>
//         <ParcelListItemSpace
//           label={
//             <Box>
//               <User size={16} />
//             </Box>
//           }
//           value={props.assignedTo}
//         />
//         <ParcelListItemSpace label="Date Assigned" value={props.dateAssigned} />
//         <ParcelListItemSpace
//           label="Date Completed"
//           value={props.dateCompleted || "N/A"}
//         />
//       </Box>
//     </Box>
//   );
// };

// "ParcelID": 11,
// "Acres": 1.59265e2,
// "StateCode": "CO",
// "County": "CO",
// "Section": "24",
// "Township": "645",
// "TownshipName": "Plain",
// "Range": "184E",
// "APN": "123-464",
// "Meridian": "22",
// "Region": "Permian"

// const parcelsTableColumns = [
//   {
//     title: "ID",
//     dataIndex: "ParcelID",
//     key: "id",
//     isSortable: true
//   },
//   {
//     title: "Parcel Number",
//     dataIndex: "ParcelNumber",
//     key: "parcelNumber",
//     isSortable: true
//   },
//   {
//     title: "APN",
//     dataIndex: "APN",
//     key: "apn",
//     isSortable: true
//   },
//   {
//     title: "Acres",
//     dataIndex: "Acres",
//     key: "age",
//     isSortable: true
//   },
//   {
//     title: "Date Assigned",
//     dataIndex: "DateAssigned",
//     key: "dateAssigned",
//     isSortable: true
//   },
//   {
//     title: "Date Completed",
//     dataIndex: "DateCompleted",
//     key: "dateCompleted",
//     isSortable: true
//   }
// ];

// const ParcelsTable = props => {
//   const globalStore = useGlobalStore();

//   return (
//     <Table
//       title="Parcel Activity"
//       columns={parcelsTableColumns}
//       data={props.parcels}
//       onRowClick={row => globalStore.setCurrentParcelID(row.title)}
//     />
//   );
// };
