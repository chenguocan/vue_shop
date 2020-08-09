import Vue from 'vue';
import {
    Form, FormItem, Button, Input, Message, Popconfirm, Container, Header, Aside, Main, Footer
    , Menu, MenuItem, Submenu, MenuItemGroup, Col, Row, Breadcrumb, BreadcrumbItem, Card, Table,
    TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag, Tree, Select, Option, Cascader, CascaderPanel
} from 'element-ui';
import { ElCascaderPanel } from 'element-ui/types/cascader-panel';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Popconfirm);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Col);
Vue.use(Row);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination)
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(CascaderPanel)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

