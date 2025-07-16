// 페이지가 모두 로드된 후에 실행되는 코드
document.addEventListener('DOMContentLoaded', function() {
    console.log('헤더 페이지가 로드되었습니다!'); // 개발자 도구에서 확인용
    
    // 로그인 버튼 찾기
    const loginBtn = document.querySelector('.login-btn');
    
    // 로그인 버튼 클릭 이벤트 - 초등생도 이해할 수 있게 주석 작성
    loginBtn.addEventListener('click', function() {
        // 로그인 버튼을 클릭했을 때 실행되는 코드
        alert('로그인 페이지로 이동합니다!');
        console.log('로그인 버튼이 클릭되었습니다.');
    });
    
    // 메뉴 링크들 찾기
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    // 각 메뉴 링크에 스무스 스크롤 이벤트 추가
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // 기본 링크 동작 방지
            e.preventDefault();
            
            // href 속성에서 타겟 섹션 ID 가져오기
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 헤더 높이 계산 (스티키 헤더 때문에 오프셋 필요)
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                // 타겟 섹션의 위치 계산 (헤더 높이만큼 빼기)
                const targetPosition = targetSection.offsetTop - headerHeight - 20; // 20px 추가 여백
                
                // 스무스 스크롤 실행
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(this.textContent + ' 섹션으로 스크롤했습니다.');
            }
        });
    });
    
    // 스크롤 이벤트 - 헤더 효과 및 맨 위로 가기 버튼 제어
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        
        // 스크롤이 50px 이상 되면 헤더에 그림자 효과 강화
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        // 스크롤이 300px 이상 되면 맨 위로 가기 버튼 표시
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // 반응형 메뉴 처리 (모바일에서 사용할 수 있도록)
    function checkScreenSize() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 480) {
            console.log('모바일 화면 크기입니다.');
        } else if (screenWidth <= 768) {
            console.log('태블릿 화면 크기입니다.');
        } else {
            console.log('데스크톱 화면 크기입니다.');
        }
    }
    
    // 화면 크기 변경 시 확인
    window.addEventListener('resize', checkScreenSize);
    
    // 처음 로드 시 화면 크기 확인
    checkScreenSize();
    
    // 기존 로고와 브랜드명 클릭 이벤트는 HTML onclick으로 처리
    
    // 마우스 호버 효과 추가 (추가 인터랙션)
    const headerContainer = document.querySelector('.header-container');
    
    headerContainer.addEventListener('mouseenter', function() {
        console.log('마우스가 헤더 위에 올라갔습니다.');
    });
    
    headerContainer.addEventListener('mouseleave', function() {
        console.log('마우스가 헤더에서 벗어났습니다.');
    });
    
    console.log('모든 헤더 기능이 준비되었습니다!');
    
    // 히어로 슬라이드 기능 시작
    initHeroSlider();
    
    // 청춘다움 발걸음 슬라이드 기능 시작
    initStepsSlider();
    
    console.log('히어로 슬라이드 기능이 준비되었습니다!');
});

// 히어로 슬라이드 전역 변수 - 현재 슬라이드 번호
let currentSlideIndex = 0;
let slideInterval; // 자동 슬라이드 타이머

// 히어로 슬라이드 초기화 함수
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // 슬라이드가 3개 있는지 확인
    if (slides.length === 3) {
        console.log('3개의 슬라이드가 준비되었습니다!');
        
        // 3초마다 자동으로 슬라이드 변경
        slideInterval = setInterval(function() {
            nextSlide();
        }, 3000); // 3초 = 3000 밀리초
        
        console.log('자동 슬라이드가 3초 간격으로 시작되었습니다!');
    } else {
        console.log('슬라이드 개수가 맞지 않습니다:', slides.length);
    }
}

// 다음 슬라이드로 이동하는 함수
function nextSlide() {
    currentSlideIndex++;
    
    // 마지막 슬라이드면 첫 번째로 돌아가기
    if (currentSlideIndex >= 3) {
        currentSlideIndex = 0;
    }
    
    showSlide(currentSlideIndex);
    console.log('다음 슬라이드로 이동: ' + (currentSlideIndex + 1));
}

// 이전 슬라이드로 이동하는 함수
function prevSlide() {
    currentSlideIndex--;
    
    // 첫 번째 슬라이드면 마지막으로 이동
    if (currentSlideIndex < 0) {
        currentSlideIndex = 2;
    }
    
    showSlide(currentSlideIndex);
    console.log('이전 슬라이드로 이동: ' + (currentSlideIndex + 1));
}

// 특정 슬라이드를 보여주는 함수
function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // 모든 슬라이드에서 active 클래스 제거
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    
    // 모든 인디케이터에서 active 클래스 제거
    indicators.forEach(function(indicator) {
        indicator.classList.remove('active');
    });
    
    // 선택된 슬라이드와 인디케이터에 active 클래스 추가
    if (slides[index] && indicators[index]) {
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
}

// 화살표 버튼 클릭 이벤트 - 방향에 따라 슬라이드 변경
function changeSlide(direction) {
    // 자동 슬라이드 잠시 멈추기
    clearInterval(slideInterval);
    
    if (direction === 1) {
        // 다음 슬라이드
        nextSlide();
    } else if (direction === -1) {
        // 이전 슬라이드
        prevSlide();
    }
    
    // 3초 후 자동 슬라이드 다시 시작
    slideInterval = setInterval(function() {
        nextSlide();
    }, 3000);
    
    console.log('수동으로 슬라이드를 변경했습니다. 자동 슬라이드 재시작!');
}

// 인디케이터 클릭 이벤트 - 특정 슬라이드로 이동
function currentSlide(index) {
    // 자동 슬라이드 잠시 멈추기
    clearInterval(slideInterval);
    
    // 배열 인덱스는 0부터 시작하므로 1을 빼줍니다
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    
    // 3초 후 자동 슬라이드 다시 시작
    slideInterval = setInterval(function() {
        nextSlide();
    }, 3000);
    
    console.log('인디케이터로 슬라이드 ' + index + '번으로 이동했습니다!');
}

// 페이지를 벗어날 때 타이머 정리
window.addEventListener('beforeunload', function() {
    if (slideInterval) {
        clearInterval(slideInterval);
        console.log('히어로 슬라이드 타이머가 정리되었습니다.');
    }
    if (stepsSlideInterval) {
        clearInterval(stepsSlideInterval);
        console.log('발걸음 슬라이드 타이머가 정리되었습니다.');
    }
});

// 운영브랜드 섹션 - 더보기/접기 기능
function toggleDescription(button) {
    // 버튼이 속한 브랜드 아이템의 설명 영역 찾기
    const brandDescription = button.parentElement;
    const preview = brandDescription.querySelector('.description-preview');
    const fullText = brandDescription.querySelector('.description-full');
    
    // 현재 전체 텍스트가 보이는지 확인
    const isFullVisible = fullText.style.display !== 'none';
    
    if (isFullVisible) {
        // 접기: 전체 텍스트 숨기고 미리보기 보이기
        fullText.style.display = 'none';
        preview.style.display = 'block';
        button.textContent = '더보기';
        console.log('설명을 접었습니다.');
    } else {
        // 더보기: 미리보기 숨기고 전체 텍스트 보이기
        preview.style.display = 'none';
        fullText.style.display = 'block';
        button.textContent = '접기';
        console.log('설명을 펼쳤습니다.');
    }
}

// 청춘다움 발걸음 슬라이드 전역 변수 - 현재 슬라이드 번호
let currentStepsSlideIndex = 0;
let stepsSlideInterval; // 자동 슬라이드 타이머

// 청춘다움 발걸음 슬라이드 초기화 함수
function initStepsSlider() {
    const stepsSlides = document.querySelectorAll('.steps-slide');
    const stepsIndicators = document.querySelectorAll('.steps-indicator');
    
    // 슬라이드가 있는지 확인
    if (stepsSlides.length > 0) {
        console.log(stepsSlides.length + '개의 발걸음 슬라이드가 준비되었습니다!');
        
        // 3초마다 자동으로 슬라이드 변경
        stepsSlideInterval = setInterval(function() {
            nextStepsSlide();
        }, 3000); // 3초 = 3000 밀리초
        
        console.log('자동 발걸음 슬라이드가 3초 간격으로 시작되었습니다!');
    } else {
        console.log('발걸음 슬라이드가 없습니다.');
    }
}

// 다음 발걸음 슬라이드로 이동하는 함수
function nextStepsSlide() {
    const stepsSlides = document.querySelectorAll('.steps-slide');
    currentStepsSlideIndex++;
    
    // 마지막 슬라이드면 첫 번째로 돌아가기
    if (currentStepsSlideIndex >= stepsSlides.length) {
        currentStepsSlideIndex = 0;
    }
    
    showStepsSlide(currentStepsSlideIndex);
    console.log('다음 발걸음 슬라이드로 이동: ' + (currentStepsSlideIndex + 1));
}

// 이전 발걸음 슬라이드로 이동하는 함수
function prevStepsSlide() {
    const stepsSlides = document.querySelectorAll('.steps-slide');
    currentStepsSlideIndex--;
    
    // 첫 번째 슬라이드면 마지막으로 이동
    if (currentStepsSlideIndex < 0) {
        currentStepsSlideIndex = stepsSlides.length - 1;
    }
    
    showStepsSlide(currentStepsSlideIndex);
    console.log('이전 발걸음 슬라이드로 이동: ' + (currentStepsSlideIndex + 1));
}

// 특정 발걸음 슬라이드를 보여주는 함수
function showStepsSlide(index) {
    const stepsSlides = document.querySelectorAll('.steps-slide');
    const stepsIndicators = document.querySelectorAll('.steps-indicator');
    
    // 모든 발걸음 슬라이드에서 active 클래스 제거
    stepsSlides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    
    // 모든 발걸음 인디케이터에서 active 클래스 제거
    stepsIndicators.forEach(function(indicator) {
        indicator.classList.remove('active');
    });
    
    // 선택된 발걸음 슬라이드와 인디케이터에 active 클래스 추가
    if (stepsSlides[index] && stepsIndicators[index]) {
        stepsSlides[index].classList.add('active');
        stepsIndicators[index].classList.add('active');
    }
}

// 발걸음 화살표 버튼 클릭 이벤트 - 방향에 따라 슬라이드 변경
function changeStepsSlide(direction) {
    // 자동 슬라이드 잠시 멈추기
    clearInterval(stepsSlideInterval);
    
    if (direction === 1) {
        // 다음 슬라이드
        nextStepsSlide();
    } else if (direction === -1) {
        // 이전 슬라이드
        prevStepsSlide();
    }
    
    // 3초 후 자동 슬라이드 다시 시작
    stepsSlideInterval = setInterval(function() {
        nextStepsSlide();
    }, 3000);
    
    console.log('수동으로 발걸음 슬라이드를 변경했습니다. 자동 슬라이드 재시작!');
}

// 발걸음 인디케이터 클릭 이벤트 - 특정 슬라이드로 이동
function currentStepsSlide(index) {
    // 자동 슬라이드 잠시 멈추기
    clearInterval(stepsSlideInterval);
    
    // 배열 인덱스는 0부터 시작하므로 1을 빼줍니다
    currentStepsSlideIndex = index - 1;
    showStepsSlide(currentStepsSlideIndex);
    
    // 3초 후 자동 슬라이드 다시 시작
    stepsSlideInterval = setInterval(function() {
        nextStepsSlide();
    }, 3000);
    
    console.log('인디케이터로 발걸음 슬라이드 ' + index + '번으로 이동했습니다!');
}

// 청춘다움 이야기 - 더보기/닫기 기능
function toggleGreeting(button) {
    // 버튼이 속한 텍스트 영역 찾기
    const greetingText = button.parentElement;
    const preview = greetingText.querySelector('.greeting-preview');
    const fullText = greetingText.querySelector('.greeting-full');
    
    // 현재 전체 텍스트가 보이는지 확인
    const isFullVisible = fullText.style.display !== 'none';
    
    if (isFullVisible) {
        // 닫기: 전체 텍스트 숨기고 미리보기 보이기
        fullText.style.display = 'none';
        preview.style.display = 'block';
        button.textContent = '더보기';
        console.log('청춘다움 이야기를 접었습니다.');
    } else {
        // 더보기: 미리보기 숨기고 전체 텍스트 보이기
        preview.style.display = 'none';
        fullText.style.display = 'block';
        button.textContent = '닫기';
        console.log('청춘다움 이야기를 펼쳤습니다.');
    }
}

// 맨 위로 스크롤하는 함수
function scrollToTop(event) {
    // 기본 이벤트 방지
    if (event) {
        event.preventDefault();
    }
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    console.log('페이지 맨 위로 스크롤했습니다.');
} 