import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ClientDashboard from "./clients/clientDashboard";
import EndUserDashboard from "./endUsers/endUsersDashboard";
import MachineDashboard from "./machines/machineDashboard";


const renderCategory = (category) =>{
  switch(category){
    case 'machines':
      return <MachineDashboard/>
    case 'clients':
      return <ClientDashboard/>
    case 'users':
      return <EndUserDashboard/>
  }
}

const DashboardCategory = () =>{
  const {category } = useParams()
  return <Box>
    {renderCategory(category)}
  </Box>
}

export default DashboardCategory;