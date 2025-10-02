import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArmorData {
  front: string;
  side: string;
  rear: string;
  turret: string;
  top?: string;
  type: string;
}

interface ArmorScheme3DProps {
  armorData: ArmorData;
  tankName: string;
}

function TankModel({ armorData, onHover }: { armorData: ArmorData; onHover: (part: string | null, armor: string) => void }) {
  const hullRef = useRef<Mesh>(null);
  const turretRef = useRef<Mesh>(null);

  useFrame(() => {
    if (turretRef.current) {
      turretRef.current.rotation.y += 0.005;
    }
  });

  const parseArmor = (armorStr: string): number => {
    const match = armorStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 45;
  };

  const getArmorColor = (thickness: number): string => {
    if (thickness < 25) return '#ff6b6b';
    if (thickness < 50) return '#ffd93d';
    if (thickness < 100) return '#6bcf7f';
    if (thickness < 150) return '#4dabf7';
    return '#845ef7';
  };

  const frontThickness = parseArmor(armorData.front);
  const sideThickness = parseArmor(armorData.side);
  const rearThickness = parseArmor(armorData.rear);
  const turretThickness = parseArmor(armorData.turret);

  return (
    <group>
      <group position={[0, -0.5, 0]}>
        <mesh 
          ref={hullRef}
          position={[0, 0, 0]}
          onPointerOver={() => onHover('Лоб корпуса', armorData.front)}
          onPointerOut={() => onHover(null, '')}
        >
          <boxGeometry args={[3, 1, 0.1]} />
          <meshStandardMaterial color={getArmorColor(frontThickness)} />
        </mesh>
        
        <mesh 
          position={[0, 0, 1]}
          onPointerOver={() => onHover('Корма', armorData.rear)}
          onPointerOut={() => onHover(null, '')}
        >
          <boxGeometry args={[3, 1, 0.1]} />
          <meshStandardMaterial color={getArmorColor(rearThickness)} />
        </mesh>
        
        <mesh 
          position={[1.5, 0, 0.5]}
          rotation={[0, Math.PI / 2, 0]}
          onPointerOver={() => onHover('Борт (правый)', armorData.side)}
          onPointerOut={() => onHover(null, '')}
        >
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color={getArmorColor(sideThickness)} />
        </mesh>
        
        <mesh 
          position={[-1.5, 0, 0.5]}
          rotation={[0, Math.PI / 2, 0]}
          onPointerOver={() => onHover('Борт (левый)', armorData.side)}
          onPointerOut={() => onHover(null, '')}
        >
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color={getArmorColor(sideThickness)} />
        </mesh>
      </group>

      <mesh 
        ref={turretRef}
        position={[0, 0.8, 0.3]}
        onPointerOver={() => onHover('Башня', armorData.turret)}
        onPointerOut={() => onHover(null, '')}
      >
        <cylinderGeometry args={[0.8, 0.9, 1, 8]} />
        <meshStandardMaterial color={getArmorColor(turretThickness)} />
      </mesh>

      <mesh position={[1.2, 0.8, -0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
        <meshStandardMaterial color="#2f2f2f" />
      </mesh>

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
    </group>
  );
}

function ArmorLegend() {
  const levels = [
    { thickness: '< 25 мм', color: '#ff6b6b', label: 'Слабая' },
    { thickness: '25-50 мм', color: '#ffd93d', label: 'Лёгкая' },
    { thickness: '50-100 мм', color: '#6bcf7f', label: 'Средняя' },
    { thickness: '100-150 мм', color: '#4dabf7', label: 'Тяжёлая' },
    { thickness: '> 150 мм', color: '#845ef7', label: 'Сверхтяжёлая' }
  ];

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-bold text-foreground mb-2">Легенда защиты:</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {levels.map((level, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: level.color }}
            />
            <div className="text-xs">
              <div className="font-semibold text-foreground">{level.label}</div>
              <div className="text-muted-foreground">{level.thickness}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArmorScheme3D({ armorData, tankName }: ArmorScheme3DProps) {
  const [hoveredPart, setHoveredPart] = useState<{ part: string; armor: string } | null>(null);

  return (
    <Card className="vintage-frame p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          3D Схема бронирования
        </h3>
        <p className="text-sm text-muted-foreground">
          Наведите курсор на части танка для детальной информации. Используйте мышь для вращения.
        </p>
      </div>

      <div className="relative h-[400px] bg-muted/20 rounded-lg overflow-hidden border-2 border-border">
        <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
          <color attach="background" args={['#1a1a1a']} />
          <TankModel 
            armorData={armorData} 
            onHover={(part, armor) => 
              part ? setHoveredPart({ part, armor }) : setHoveredPart(null)
            }
          />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <gridHelper args={[10, 10, '#444444', '#333333']} position={[0, -1.5, 0]} />
        </Canvas>

        {hoveredPart && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-accent text-accent-foreground text-base px-4 py-2">
              <span className="font-bold">{hoveredPart.part}:</span> {hoveredPart.armor}
            </Badge>
          </div>
        )}

        <div className="absolute bottom-4 right-4 z-10">
          <Badge variant="outline" className="bg-background/80 backdrop-blur">
            🖱️ Вращайте мышью
          </Badge>
        </div>
      </div>

      <ArmorLegend />

      <div className="mt-4 p-4 bg-muted/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">Тип брони:</span> {armorData.type}
        </p>
      </div>
    </Card>
  );
}
