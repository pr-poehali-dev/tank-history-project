import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { shellsDatabase, Shell, canPenetrate, getPenetrationAtDistance } from '@/data/ammunition';

interface PenetrationSimulatorProps {
  tankName: string;
  tankPeriod: string;
  armorThickness: number;
}

interface ProjectileProps {
  shell: Shell;
  isActive: boolean;
  onHit: (penetrated: boolean) => void;
  distance: number;
  armorThickness: number;
}

function Projectile({ shell, isActive, onHit, distance, armorThickness }: ProjectileProps) {
  const meshRef = useRef<Mesh>(null);
  const [position, setPosition] = useState(new Vector3(-5, 0, 0));
  const [hasHit, setHasHit] = useState(false);

  useFrame(() => {
    if (isActive && !hasHit && meshRef.current) {
      const speed = shell.velocity / 500;
      const newX = meshRef.current.position.x + speed;
      
      if (newX >= 0) {
        if (!hasHit) {
          const penetrated = canPenetrate(shell, armorThickness, distance);
          onHit(penetrated);
          setHasHit(true);
        }
      } else {
        meshRef.current.position.x = newX;
      }
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial 
        color={shell.color} 
        emissive={shell.color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

interface ImpactEffectProps {
  penetrated: boolean;
  position: Vector3;
}

function ImpactEffect({ penetrated, position }: ImpactEffectProps) {
  const [scale, setScale] = useState(0.1);
  const [opacity, setOpacity] = useState(1);

  useFrame(() => {
    setScale(prev => Math.min(prev + 0.1, 2));
    setOpacity(prev => Math.max(prev - 0.05, 0));
  });

  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial 
        color={penetrated ? '#22c55e' : '#ef4444'}
        transparent
        opacity={opacity}
        emissive={penetrated ? '#22c55e' : '#ef4444'}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function TargetArmor({ thickness, isPenetrated }: { thickness: number; isPenetrated: boolean }) {
  const getColorByThickness = (t: number) => {
    if (t < 25) return '#ff6b6b';
    if (t < 50) return '#ffd93d';
    if (t < 100) return '#6bcf7f';
    if (t < 150) return '#4dabf7';
    return '#845ef7';
  };

  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.2, 2, 2]} />
        <meshStandardMaterial 
          color={isPenetrated ? '#ef4444' : getColorByThickness(thickness)}
          opacity={isPenetrated ? 0.3 : 1}
          transparent={isPenetrated}
        />
      </mesh>
      <Text
        position={[0.2, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="left"
        anchorY="middle"
      >
        {thickness} мм
      </Text>
    </group>
  );
}

export default function PenetrationSimulator({ tankName, tankPeriod, armorThickness }: PenetrationSimulatorProps) {
  const [selectedShell, setSelectedShell] = useState<Shell | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [distance, setDistance] = useState(500);
  const [result, setResult] = useState<{ penetrated: boolean; message: string } | null>(null);
  const [impactPosition, setImpactPosition] = useState<Vector3 | null>(null);

  const availableShells = shellsDatabase.filter(shell => {
    const shellYear = parseInt(shell.year);
    const tankStartYear = parseInt(tankPeriod.split('-')[0]);
    return shellYear >= tankStartYear - 10;
  });

  const handleFire = () => {
    if (!selectedShell) return;
    
    setIsSimulating(true);
    setResult(null);
    setImpactPosition(null);
  };

  const handleHit = (penetrated: boolean) => {
    const penetrationValue = getPenetrationAtDistance(selectedShell!, distance);
    setImpactPosition(new Vector3(0, 0, 0));
    
    const message = penetrated 
      ? `✅ Пробитие! (${penetrationValue.toFixed(0)} мм > ${armorThickness} мм на ${distance}м)`
      : `❌ Не пробил! (${penetrationValue.toFixed(0)} мм < ${armorThickness} мм на ${distance}м)`;
    
    setResult({ penetrated, message });
    
    setTimeout(() => {
      setIsSimulating(false);
      setImpactPosition(null);
    }, 1000);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setResult(null);
    setImpactPosition(null);
  };

  return (
    <Card className="vintage-frame p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="Target" size={28} />
          Симулятор пробития брони
        </h3>
        <p className="text-sm text-muted-foreground">
          Выберите снаряд и дистанцию для проверки пробития брони танка {tankName}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Rocket" size={20} />
            Выбор снаряда:
          </h4>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {availableShells.map(shell => (
              <button
                key={shell.id}
                onClick={() => {
                  setSelectedShell(shell);
                  resetSimulation();
                }}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedShell?.id === shell.id 
                    ? 'border-accent bg-accent/20' 
                    : 'border-border hover:border-accent/50 bg-muted/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: shell.color }}
                  />
                  <span className="font-bold text-foreground">{shell.name}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {shell.typeName} • {shell.year} • {shell.country}
                </div>
                <div className="text-xs text-accent mt-1">
                  Пробитие: {shell.penetration.distance500m} мм (500м)
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Ruler" size={20} />
            Дистанция стрельбы:
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">{distance} метров</span>
              {selectedShell && (
                <Badge variant="outline">
                  Пробитие: {getPenetrationAtDistance(selectedShell, distance).toFixed(0)} мм
                </Badge>
              )}
            </div>
            <Slider
              value={[distance]}
              onValueChange={(value) => {
                setDistance(value[0]);
                resetSimulation();
              }}
              min={100}
              max={1500}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100м</span>
              <span>500м</span>
              <span>1000м</span>
              <span>1500м</span>
            </div>
          </div>

          {selectedShell && (
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">{selectedShell.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Скорость:</span>
                  <span className="ml-2 font-bold text-foreground">{selectedShell.velocity} м/с</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Калибр:</span>
                  <span className="ml-2 font-bold text-foreground">{selectedShell.caliber}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative h-[400px] bg-gradient-to-b from-sky-900/20 to-green-900/20 rounded-lg overflow-hidden border-2 border-border mb-4">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <color attach="background" args={['#0f1419']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          <TargetArmor thickness={armorThickness} isPenetrated={result?.penetrated || false} />
          
          {selectedShell && isSimulating && (
            <Projectile 
              shell={selectedShell}
              isActive={isSimulating}
              onHit={handleHit}
              distance={distance}
              armorThickness={armorThickness}
            />
          )}
          
          {impactPosition && result && (
            <ImpactEffect penetrated={result.penetrated} position={impactPosition} />
          )}
          
          <OrbitControls enableZoom={false} enablePan={false} />
          <gridHelper args={[20, 20, '#333333', '#222222']} position={[0, -1, 0]} />
        </Canvas>

        {result && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <Badge 
              className={`text-base px-6 py-3 ${
                result.penetrated 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}
            >
              {result.message}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={handleFire}
          disabled={!selectedShell || isSimulating}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
        >
          <Icon name="Zap" size={20} className="mr-2" />
          {isSimulating ? 'Выстрел...' : 'Произвести выстрел'}
        </Button>
        <Button 
          onClick={resetSimulation}
          variant="outline"
          size="lg"
        >
          <Icon name="RotateCcw" size={20} className="mr-2" />
          Сброс
        </Button>
      </div>

      <div className="mt-4 p-4 bg-muted/20 rounded-lg">
        <h5 className="font-bold text-foreground mb-2 flex items-center gap-2">
          <Icon name="Info" size={18} />
          Броня цели:
        </h5>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-display text-accent">{armorThickness} мм</div>
          <div className="text-sm text-muted-foreground">
            Для пробития на выбранной дистанции снаряд должен иметь пробитие больше этого значения
          </div>
        </div>
      </div>
    </Card>
  );
}
