import React from 'react'
import { CWidgetStatsD, CCol, CImage } from '@coreui/react-pro'
export interface WidgetsAvailableProps {
  icon: any,
  sent: number,
  failed: number,
  available: number
}

export const WidgetsAvailable: React.FC<WidgetsAvailableProps> = ({
  icon,
  sent,
  failed,
  available,
}: WidgetsAvailableProps) => {


  return (

    <CCol sm={4} lg={3}>
      <CWidgetStatsD
        className="mb-4"
        icon={<CImage src={icon} height={52} className="my-4" />}
        values={[
          { title: 'Enviados', value: sent },
          { title: 'Fallas', value: failed },
          { title: 'Disponibles', value: available },
        ]}
      />
    </CCol>

  )
}



export default WidgetsAvailable
