import Vue from 'vue';

//1.底部导航
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);

//2.加载Loading
import { Loading } from 'vant';

Vue.use(Loading);

//3.图片懒加载
import { Image } from 'vant';

Vue.use(Image);

//4.提示
import { Toast } from 'vant';

Vue.use(Toast);

//5.蒙版提升
import { Dialog } from 'vant';

Vue.use(Dialog);

//导航条
import { NavBar } from 'vant';

Vue.use(NavBar);

//地址
import { ContactCard, ContactList, ContactEdit } from 'vant';

Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);

import { AddressList } from 'vant';

Vue.use(AddressList);
//地址编辑
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);

//单元格
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);

//提交订单栏
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);

//宫格
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);

//icon 图标
import { Icon } from 'vant';
Vue.use(Icon);