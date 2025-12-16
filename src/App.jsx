import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import HollowKnightScene from './components/HollowKnightScene'
import { useScrollProgress } from './hooks/useScrollProgress'
import './style/App.css'

function App() {
  const scrollProgress = useScrollProgress()

  return (
    <div className="app-container">
      {/* 고정된 3D 캔버스 */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[-5, 3, -5]} intensity={0.8} />
          <spotLight position={[0, 10, 0]} intensity={0.6} angle={0.6} penumbra={1} />

          <HollowKnightScene scrollProgress={scrollProgress} />

          <Environment preset="sunset" />
        </Canvas>

        {/* 스크롤 진행 표시기 */}
        <div className="scroll-indicator">
          <div
            className="scroll-progress-bar"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* 스크롤 가능한 콘텐츠 */}
      <div className="content-sections">
        <section className="section">
          <h1>민경원 자기소개 홈페이지</h1>
          <p>스크롤을 내려보세요</p>
        </section>

        <section className="section">
          <h2>자기소개</h2>
          <p>자기소개 칸 </p>
        </section>

        <section className="section highlight">
          <h2>경력사항</h2>
          <p>경력 사항, 교육사항, 자격증</p>
        </section>

        <section className="section">
          <h2>기술 스택</h2>
          <p>계속 스크롤하여 애니메이션을 확인하세요</p>
        </section>

        <section className="section">
          <h2>포트폴리오 </h2>
          <p>사이드바 혹은 탭바로 구성 예정</p>
        </section>
      </div>
    </div>
  )
}

export default App
