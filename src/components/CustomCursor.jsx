import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices to avoid rendering cursor on phones/tablets
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp for trailing aura
  useEffect(() => {
    if (isTouchDevice) return;
    let animationFrameId;

    const followMouse = () => {
      setTrailingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      animationFrameId = requestAnimationFrame(followMouse);
    };

    animationFrameId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  // Track hover state over clickable elements
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Sharp Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#915eff] rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isMouseDown ? 0.7 : 1})`,
        }}
      />

      {/* Trailing Outer Aura Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-all duration-200 ease-out ${
          isHovered
            ? 'w-12 h-12 border-2 border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
            : 'w-8 h-8 border border-[#915eff]/80 bg-[#915eff]/10 shadow-[0_0_15px_rgba(145,94,255,0.4)]'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 16)}px, ${
            trailingPos.y - (isHovered ? 24 : 16)
          }px, 0) scale(${isMouseDown ? 0.85 : isHovered ? 1.2 : 1})`,
        }}
      />
    </>
  );
};

export default CustomCursor;
