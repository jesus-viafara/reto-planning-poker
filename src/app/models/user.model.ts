export interface User {
  id: string;
  name: string;
  rol: string;
  modo: string;
  vote: string;
}

//Data mocked
export const userList1: User[] = [
  { id: 'u001', name: 'Laura Méndez', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u002', name: 'Tomás Herrera', rol: 'jugador', modo: 'espectador', vote: '?' },
  { id: 'u003', name: 'Camila Rojas', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u004', name: 'Diego Salazar', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u005', name: 'Isabela Cruz', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u006', name: 'Mateo Vargas', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u007', name: 'Daniela León', rol: 'jugador', modo: 'jugador', vote: '?' },
];

export const userList2: User[] = [
  { id: 'u009', name: 'Natalia Peña', rol: 'jugador', modo: 'espectador', vote: '?' },
  { id: 'u010', name: 'Andrés Molina', rol: 'jugador', modo: 'jugador', vote: '4' },
  { id: 'u011', name: 'Valeria Torres', rol: 'jugador', modo: 'jugador', vote: '6' },
  { id: 'u012', name: 'Juan Esteban', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u013', name: 'Santiago López', rol: 'jugador', modo: 'jugador', vote: '2' },
  { id: 'u014', name: 'Mariana Díaz', rol: 'jugador', modo: 'jugador', vote: '15' },
  { id: 'u015', name: 'Felipe Ramírez', rol: 'jugador', modo: 'espectador', vote: '?' },
];

export const userList3: User[] = [
  { id: 'u017', name: 'Jorge Castaño', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u018', name: 'Paula Medina', rol: 'jugador', modo: 'espectador', vote: '?' },
  { id: 'u019', name: 'Ricardo Gómez', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u020', name: 'Carolina Suárez', rol: 'jugador', modo: 'espectador', vote: '?' },
  { id: 'u021', name: 'Esteban Ríos', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u022', name: 'Juliana Vega', rol: 'jugador', modo: 'espectador', vote: '?' },
  { id: 'u023', name: 'Mauricio León', rol: 'jugador', modo: 'jugador', vote: '?' },
];
