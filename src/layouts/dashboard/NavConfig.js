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
      title:'Estados',
      path:'/home/catalogo/estados'
    },
    {
      title:'Procesos y actividades',
      path:'/home/catalogo/proceso'
    },
    {
      title:'Lineas de Investigación',
      path:'/home/catalogo/lineas'
    }
  ]
  },
  {
    title:'usuarios',
    path:'/home/usuarios',
    icon:getIcon('eva:people-fill'),
    children:[
      {
        title:'docentes',
        path:'/home/usuarios/docentes'
      },
      {
        title:'estudiantes',
        path:'/usuarios/estudiantes'
      }
    ]
  }
];

export default navConfig;
