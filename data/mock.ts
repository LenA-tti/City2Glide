export const mockRoutes = [
  {
    id: 'r1',
    name: 'Route 1',
    stops: [
      { id: 's1', name: 'Stop 1' },
      { id: 's2', name: 'Stop 2' },
    ],
    polyline: [[-24.656,25.912],[-24.657,25.913]]
  }
];

export const mockVehicles = [
  { id: 'v1', plate: 'B 123 ABC', label: 'Vehicle 1', capacity: 14, status: 'active', route_id: 'r1' },
  { id: 'v2', plate: 'B 987 XYZ', label: 'Vehicle 2', capacity: 18, status: 'maintenance', route_id: 'r1' },
];
