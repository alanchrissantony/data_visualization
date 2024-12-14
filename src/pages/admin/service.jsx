import React from 'react'
import Navbar from '../../components/admin/navbar'
import ServiceInfo from '../../components/admin/serviceInfo'
import ServiceStationSelector from '../../components/admin/serviceStationSelector'
import Timer from '../../components/admin/timer'
import ControlButtons from '../../components/admin/control'

function Service() {
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1">
            <ServiceInfo />
        </div>
        <div className="col-span-1">
            <ServiceStationSelector />
            <Timer />
            <ControlButtons />
        </div>
    </div>
</>
  )
}

export default Service