import { User } from './models/user.model';

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
  { id: 'u009', name: 'Natalia Peña', rol: 'jugador', modo: 'jugador', vote: '?' },
  { id: 'u010', name: 'Andrés Molina', rol: 'jugador', modo: 'espectador', vote: '4' },
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

// Series for votes

export function seriePersonalizada(n: number) {
  const secuencia = [];
  let valor = 1;
  for (let i = 0; i < n; i++) {
    secuencia.push(valor + '');
    if (i % 2 === 0) {
      valor += 3;
    } else {
      valor *= 2;
    }
  }
  return secuencia;
}

export function serieFibonacci(n: number): string[] {
  const serie: string[] = [];
  let newNumber = '';
  for (let i = 0; i <= n; i++) {
    newNumber = fibonacciIterative(i);
    if (serie.indexOf(newNumber) >= 0) continue;
    serie.push(newNumber);
  }
  return serie;
}

export function fibonacciIterative(n: number): string {
  if (n <= 1) {
    return n + '';
  }

  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    const nextFib = a + b;
    a = b;
    b = nextFib;
  }
  return b + '';
}

// Example: Tribonacci sequence (sum of the last three terms)
export function escalaDuplicacion(n: number): string[] {
  const serie: string[] = [];
  for (let i = 0; i <= n; i++) {
    if (i === 0) {
      serie.push(i + '');
      continue;
    }
    if (i === 1) {
      serie.push(i + '');
      continue;
    }
    let anterior = parseInt(serie[i - 1]);
    serie.push(2 * anterior + '');
  }
  return serie;
}
