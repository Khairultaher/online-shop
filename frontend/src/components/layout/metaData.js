import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({title}) => {
  return (
    <Helmet>
      <title>{`${title} Online-Shop`}</title>
    </Helmet>
  )
}

export default MetaData
