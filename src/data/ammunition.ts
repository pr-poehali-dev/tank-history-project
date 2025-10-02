export interface Shell {
  id: string;
  name: string;
  caliber: string;
  type: 'AP' | 'APHE' | 'APCR' | 'HEAT' | 'HE' | 'APDS' | 'APFSDS';
  typeName: string;
  penetration: {
    distance100m: number;
    distance500m: number;
    distance1000m: number;
    distance1500m: number;
  };
  velocity: number;
  period: string;
  country: string;
  year: string;
  description: string;
  color: string;
}

export const shellsDatabase: Shell[] = [
  {
    id: 'ap-37mm-ww1',
    name: '37-мм бронебойный',
    caliber: '37 мм',
    type: 'AP',
    typeName: 'Бронебойный сплошной',
    penetration: {
      distance100m: 20,
      distance500m: 15,
      distance1000m: 10,
      distance1500m: 5
    },
    velocity: 450,
    period: 'Зарождение',
    country: 'СССР',
    year: '1927',
    description: 'Ранний бронебойный снаряд для лёгких танков. Пробивает только тонкую броню.',
    color: '#ff6b6b'
  },
  {
    id: 'ap-45mm-prewar',
    name: '45-мм БР-240',
    caliber: '45 мм',
    type: 'AP',
    typeName: 'Бронебойный тупоголовый',
    penetration: {
      distance100m: 43,
      distance500m: 35,
      distance1000m: 28,
      distance1500m: 20
    },
    velocity: 760,
    period: 'Довоенный',
    country: 'СССР',
    year: '1934',
    description: 'Основной снаряд довоенных лёгких танков БТ и Т-26. Эффективен против лёгкой брони.',
    color: '#ffd93d'
  },
  {
    id: 'ap-76mm-early',
    name: '76-мм БР-350А',
    caliber: '76,2 мм',
    type: 'APHE',
    typeName: 'Бронебойный с баллистическим наконечником',
    penetration: {
      distance100m: 69,
      distance500m: 61,
      distance1000m: 51,
      distance1500m: 43
    },
    velocity: 662,
    period: 'ВОВ',
    country: 'СССР',
    year: '1940',
    description: 'Основной снаряд Т-34 и КВ-1. Баллистический наконечник улучшает пробитие наклонной брони.',
    color: '#6bcf7f'
  },
  {
    id: 'apcr-76mm',
    name: '76-мм БР-350П',
    caliber: '76,2 мм',
    type: 'APCR',
    typeName: 'Подкалиберный',
    penetration: {
      distance100m: 92,
      distance500m: 74,
      distance1000m: 55,
      distance1500m: 40
    },
    velocity: 950,
    period: 'ВОВ',
    country: 'СССР',
    year: '1943',
    description: 'Подкалиберный снаряд с вольфрамовым сердечником. Высокое пробитие на близких дистанциях.',
    color: '#4dabf7'
  },
  {
    id: 'ap-88mm-german',
    name: '88-мм Pzgr.39',
    caliber: '88 мм',
    type: 'APHE',
    typeName: 'Бронебойный остроголовый',
    penetration: {
      distance100m: 165,
      distance500m: 153,
      distance1000m: 138,
      distance1500m: 120
    },
    velocity: 773,
    period: 'ВОВ',
    country: 'Германия',
    year: '1941',
    description: 'Снаряд легендарной 88-мм пушки "Тигра" и "Фердинанда". Пробивает любые средние танки.',
    color: '#845ef7'
  },
  {
    id: 'ap-85mm',
    name: '85-мм БР-365',
    caliber: '85 мм',
    type: 'APHE',
    typeName: 'Бронебойный остроголовый',
    penetration: {
      distance100m: 102,
      distance500m: 87,
      distance1000m: 69,
      distance1500m: 54
    },
    velocity: 792,
    period: 'ВОВ',
    country: 'СССР',
    year: '1944',
    description: 'Снаряд Т-34-85 и ИС-1. Способен поражать "Тигры" и "Пантеры" в борт.',
    color: '#20c997'
  },
  {
    id: 'ap-122mm',
    name: '122-мм БР-471',
    caliber: '122 мм',
    type: 'APHE',
    typeName: 'Бронебойный остроголовый',
    penetration: {
      distance100m: 145,
      distance500m: 135,
      distance1000m: 120,
      distance1500m: 110
    },
    velocity: 781,
    period: 'ВОВ',
    country: 'СССР',
    year: '1943',
    description: 'Мощнейший снаряд ИС-2 и ИС-3. Огромное заброневое действие благодаря взрывчатке.',
    color: '#f03e3e'
  },
  {
    id: 'heat-90mm',
    name: '90-мм кумулятивный',
    caliber: '90 мм',
    type: 'HEAT',
    typeName: 'Кумулятивный',
    penetration: {
      distance100m: 280,
      distance500m: 280,
      distance1000m: 280,
      distance1500m: 280
    },
    velocity: 914,
    period: 'Холодная война',
    country: 'США',
    year: '1950',
    description: 'Кумулятивный снаряд с постоянным пробитием на всех дистанциях. Пробивает кумулятивной струёй.',
    color: '#ff8787'
  },
  {
    id: 'apds-105mm',
    name: '105-мм L28A1',
    caliber: '105 мм',
    type: 'APDS',
    typeName: 'Подкалиберный оперённый',
    penetration: {
      distance100m: 268,
      distance500m: 240,
      distance1000m: 200,
      distance1500m: 170
    },
    velocity: 1470,
    period: 'Холодная война',
    country: 'Великобритания',
    year: '1958',
    description: 'Оперённый подкалиберный снаряд. Высокая бронепробиваемость за счёт скорости.',
    color: '#5c7cfa'
  },
  {
    id: 'apfsds-125mm',
    name: '125-мм 3БМ42 "Манго"',
    caliber: '125 мм',
    type: 'APFSDS',
    typeName: 'Бронебойный подкалиберный оперённый',
    penetration: {
      distance100m: 470,
      distance500m: 450,
      distance1000m: 420,
      distance1500m: 380
    },
    velocity: 1700,
    period: 'Современность',
    country: 'СССР/Россия',
    year: '1986',
    description: 'Современный БОПС с урановым/вольфрамовым сердечником. Пробивает композитную броню.',
    color: '#e64980'
  },
  {
    id: 'apfsds-125mm-modern',
    name: '125-мм 3БМ60 "Свинец"',
    caliber: '125 мм',
    type: 'APFSDS',
    typeName: 'Бронебойный подкалиберный оперённый',
    penetration: {
      distance100m: 650,
      distance500m: 630,
      distance1000m: 600,
      distance1500m: 550
    },
    velocity: 1750,
    period: 'Современность',
    country: 'Россия',
    year: '2015',
    description: 'Новейший БОПС для Т-90М и Т-14. Пробивает современную композитную броню с ДЗ.',
    color: '#ae3ec9'
  },
  {
    id: 'heat-125mm',
    name: '125-мм 3БК29 кумулятивный',
    caliber: '125 мм',
    type: 'HEAT',
    typeName: 'Кумулятивный',
    penetration: {
      distance100m: 550,
      distance500m: 550,
      distance1000m: 550,
      distance1500m: 550
    },
    velocity: 905,
    period: 'Современность',
    country: 'СССР/Россия',
    year: '1985',
    description: 'Мощный кумулятивный снаряд. Эффективен против динамической защиты при тандемном заряде.',
    color: '#fd7e14'
  },
  {
    id: 'apfsds-120mm-nato',
    name: '120-мм DM53',
    caliber: '120 мм',
    type: 'APFSDS',
    typeName: 'Бронебойный подкалиберный оперённый',
    penetration: {
      distance100m: 560,
      distance500m: 540,
      distance1000m: 510,
      distance1500m: 470
    },
    velocity: 1650,
    period: 'Современность',
    country: 'Германия/НАТО',
    year: '2000',
    description: 'Современный натовский БОПС для Leopard 2 и M1 Abrams. Вольфрамовый сердечник.',
    color: '#15aabf'
  },
  {
    id: 'he-152mm',
    name: '152-мм ОФ-530',
    caliber: '152 мм',
    type: 'HE',
    typeName: 'Осколочно-фугасный',
    penetration: {
      distance100m: 0,
      distance500m: 0,
      distance1000m: 0,
      distance1500m: 0
    },
    velocity: 655,
    period: 'ВОВ',
    country: 'СССР',
    year: '1940',
    description: 'Фугасный снаряд КВ-2. Не пробивает броню, но уничтожает укрепления и технику ударной волной.',
    color: '#fa5252'
  }
];

export function getShellsForPeriod(period: string): Shell[] {
  return shellsDatabase.filter(shell => shell.period === period);
}

export function canPenetrate(shell: Shell, armorThickness: number, distance: number): boolean {
  let penetration = shell.penetration.distance100m;
  
  if (distance >= 1500) penetration = shell.penetration.distance1500m;
  else if (distance >= 1000) penetration = shell.penetration.distance1000m;
  else if (distance >= 500) penetration = shell.penetration.distance500m;
  
  return penetration > armorThickness;
}

export function getPenetrationAtDistance(shell: Shell, distance: number): number {
  if (distance <= 100) return shell.penetration.distance100m;
  if (distance <= 500) {
    const ratio = (distance - 100) / 400;
    return shell.penetration.distance100m - ratio * (shell.penetration.distance100m - shell.penetration.distance500m);
  }
  if (distance <= 1000) {
    const ratio = (distance - 500) / 500;
    return shell.penetration.distance500m - ratio * (shell.penetration.distance500m - shell.penetration.distance1000m);
  }
  if (distance <= 1500) {
    const ratio = (distance - 1000) / 500;
    return shell.penetration.distance1000m - ratio * (shell.penetration.distance1000m - shell.penetration.distance1500m);
  }
  return shell.penetration.distance1500m;
}
