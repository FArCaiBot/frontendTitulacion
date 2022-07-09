// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/home/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Catálogo',
    icon: getIcon('bxs:food-menu'),
    path: '/home/catalogo',
    children: [{
      title: 'Periodo Académico',
      path: '/home/catalogo/periodo'
    },
    {
      title:'Estados del proyecto',
      path:'/home/catalogo/estados'
    },
    {
      title:'Procesos y actividades',
      path:'/home/catalogo/proceso'
    }
  ]
  },
  {
    title:'usuarios',
    path:'/usuarios',
    icon:getIcon('carbon:user-filled'),
    children:[
      {
        title:'docentes',
        path:'/usuarios/docentes'
      },
      {
        title:'estudiantes',
        path:'/usuarios/estudiantes'
      }
    ]
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
