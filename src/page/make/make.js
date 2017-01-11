import _ from 'underscore'
import redux from 'redux'

import navHtml from './nav.html'
import pageHtml from './page.html'
import "./make.less"


var content=$('#content')

content.append(navHtml)
content.append(pageHtml)
