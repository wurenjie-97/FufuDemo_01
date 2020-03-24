import Vue from 'vue'
import { Button, BreadcrumbItem, Breadcrumb, Tabs, TabPane, Pagination, Table, TableColumn, Dialog, Form, FormItem, Input, Row, Col, MessageBox, Message } from 'element-ui'

Vue.use(Button)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
