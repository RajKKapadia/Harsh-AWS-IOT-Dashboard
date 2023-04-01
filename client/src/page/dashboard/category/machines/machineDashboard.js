import { useGetMachineListQuery } from '../../../../redux/slice/machineQuery'

const MachineDashboard = () => {
  const { data, isLoading, isSuccess } = useGetMachineListQuery('machine')
  return <div>Machine </div>
}

export default MachineDashboard
