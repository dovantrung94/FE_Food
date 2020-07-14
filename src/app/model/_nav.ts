import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Product',
    url: 'http://localhost:4200/admin',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Category',
    url: 'http://localhost:4200/admin/category',
    icon: 'icon-layers',
    attributes: { disabled: false },
  },
  {
    name: 'User',
    url: 'http://localhost:4200/admin/user',
    icon: 'icon-user',
    attributes: { disabled: false },
  }
  // ,
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-cil-media-play',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }
];
