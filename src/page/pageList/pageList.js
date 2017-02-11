import React from 'react'
import {render} from 'react-dom'
import _ from 'underscore'

var content = document.getElementById('content')

import Nav from 'widget/nav/nav-react.js'

render((
  <div>
    <Nav select="make"/>
  </div>
),content)
