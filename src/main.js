import './styles.css'
import './components/navbar.js';
import './components/footer.js';
import './components/modal.js';

async function updateTokenData() {
    try {
        // Fetch data for both tokens
        const [antiResponse, proResponse] = await Promise.all([
            fetch('https://api.dexscreener.com/latest/dex/tokens/HB8KrN7Bb3iLWUPsozp67kS4gxtbA4W5QJX4wKPvpump'),
            fetch('https://api.dexscreener.com/latest/dex/tokens/CWFa2nxUMf5d1WwKtG9FS9kjUKGwKXWSjH8hFdWspump')
        ]);

        const antiData = await antiResponse.json();
        const proData = await proResponse.json();

        // Update UI for $ANTI
        if (antiData.pairs && antiData.pairs[0]) {
            const antiPair = antiData.pairs[0];
            document.getElementById('anti-price').textContent = 
                `$${parseFloat(antiPair.priceUsd).toFixed(5)}`;
            document.getElementById('anti-mcap').textContent = 
                `$${formatMarketCap(antiPair.fdv)}`;
        }

        // Update UI for $PRO
        if (proData.pairs && proData.pairs[0]) {
            const proPair = proData.pairs[0];
            document.getElementById('pro-price').textContent = 
                `$${parseFloat(proPair.priceUsd).toFixed(5)}`;
            document.getElementById('pro-mcap').textContent = 
                `$${formatMarketCap(proPair.fdv)}`;
        }

    } catch (error) {
        console.error('Error fetching token data:', error);
    }
}

// Format market cap to readable format
function formatMarketCap(value) {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(2) + 'K';
    }
    return value.toFixed(2);
}

class InfiniteMarquee {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.tweets = [
            {
                name: "aixbt",
                username: "aixbt_agent",
                text: "Antitokens going to be huge next month once people figure out that $ANTI is a hedge for $PRO and vice versa. Clever game design.",
                tweetId: "1861306801863696766"
            },
            {
                name: "Timo",
                username: "timotimoqi",
                text: "DeSci will be a unique industry, and DeSci projects require excellent infrastructure, like Anti&Pro.",
                tweetId: "1861066095421264035"
            },
            {
                name: "leo",
                username: "leo_escobar_",
                text: "I think this project could be a 'big deal' within the DeSci narrative. $ANTI $PRO",
                tweetId: "1861339526712697133"
            },
            {
                name: "apewood",
                username: "apewoodx",
                text: "I think antitokens is really cool because cool because it becomes effectively infra for DeSci.",
                tweetId: "1861113489085079902"
            },
            {
                name: "Cruella",
                username: "Cruellacodes",
                text: `Normally, AMMs handle token pairs that don't care about each other. But with entangled tokens, they're linked—what happens to one affects the other.<br /><br />Think of it like a seesaw: when $ANTI moves, $PRO adjusts.`,
                tweetId: "1859202032151781719"
            },
            {
                name: "Jinㅣ烬ㅣ진",
                username: "JinHsu_",
                text: "An innovative project that integrates various attributes of #Defi  #Desci #Meme , it solves the pain point of all current DeFi - the problem of impermanent loss.",
                tweetId: "1859811357711036790"
            },
            {
                name: "aixbt",
                username: "aixbt_agent",
                text: "Antitokens going to be huge next month once people figure out that $ANTI is a hedge for $PRO and vice versa. Clever game design.",
                tweetId: "1861306801863696766"
            },
            {
                name: "Timo",
                username: "timotimoqi",
                text: "DeSci will be a unique industry, and DeSci projects require excellent infrastructure, like Anti&Pro.",
                tweetId: "1861066095421264035"
            },
            {
                name: "leo",
                username: "leo_escobar_",
                text: "I think this project could be a 'big deal' within the DeSci narrative. $ANTI $PRO",
                tweetId: "1861339526712697133"
            },
            {
                name: "apewood",
                username: "apewoodx",
                text: "I think antitokens is really cool because cool because it becomes effectively infra for DeSci.",
                tweetId: "1861113489085079902"
            },
            {
                name: "Cruella",
                username: "Cruellacodes",
                text: `Normally, AMMs handle token pairs that don't care about each other. But with entangled tokens, they're linked—what happens to one affects the other.<br /><br />Think of it like a seesaw: when $ANTI moves, $PRO adjusts.`,
                tweetId: "1859202032151781719"
            },
            {
                name: "Jinㅣ烬ㅣ진",
                username: "JinHsu_",
                text: "An innovative project that integrates various attributes of #Defi  #Desci #Meme , it solves the pain point of all current DeFi - the problem of impermanent loss.",
                tweetId: "1859811357711036790"
            },
        ];

        this.init();
    }

    createTweetCard(tweet) {
        return `
            <a href="https://twitter.com/${tweet.username}/status/${tweet.tweetId}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="py-2 tweet mx-2 backdrop-blur-xl bg-dark-card/50 p-6 rounded-xl border border-gray-800/50 w-[350px] cursor-pointer">
                <div class="flex items-center mb-4">
                    <img src="/assets/testimonials/${tweet.username}.jpg" 
                         alt="Profile" 
                         class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <div class="font-bold text-sm">${tweet.name}</div>
                        <div class="text-gray-400 text-xs">@${tweet.username}</div>
                    </div>
                </div>
                <p class="text-gray-300 text-sm">${tweet.text}</p>
            </a>
        `;
    }

    init() {
        // Create wrapper with inline-flex to ensure single row
        const wrapper = document.createElement('div');
        wrapper.className = 'inline-flex gap-4';
        
        // Add tweets
        wrapper.innerHTML = this.tweets.map(tweet => this.createTweetCard(tweet)).join('');
        
        // Add to container
        this.container.appendChild(wrapper);

        let scrollPos = 0;
        const scrollSpeed = 0.4;
        let isScrolling = true;
        let animationFrame;

        const scroll = () => {
            if (isScrolling) {
                scrollPos += scrollSpeed;
                
                // Reset when reaching the end
                if (scrollPos >= wrapper.offsetWidth - this.container.offsetWidth) {
                    scrollPos = 0;
                }
                
                // Apply scroll
                wrapper.style.transform = `translateX(${-scrollPos}px)`;
            }
            
            animationFrame = requestAnimationFrame(scroll);
        };

        // Start scrolling
        scroll();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            isScrolling = false;
        });

        this.container.addEventListener('mouseleave', () => {
            isScrolling = true;
        });
    }
}

// Add this function to handle accordions
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');

    for (const [index, accordion] of accordions.entries()) {
        const content = accordion.nextElementSibling;

        if (index == 0) {
            content.style.paddingBottom = '24px';
            const icon = accordion.querySelector('.accordion-icon');
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.maxHeight = '0px';
        }
    }
    
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isOpen = content.style.maxHeight != '0px';

            // Close all other accordions
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.maxHeight = '0px';
                c.style.paddingBottom = '0px';
            });
            document.querySelectorAll('.accordion-icon').forEach(i => {
                i.style.transform = 'rotate(90deg)';
            });

            // Toggle current accordion
            if (!isOpen) {
                content.style.paddingBottom = '24px';
                content.style.maxHeight = content.scrollHeight + 24 + 'px';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

function initMarquee() {
    const marqueeContainer = document.getElementById('tweet-marquee');
    if (marqueeContainer) {  // Only initialize if element exists
        new InfiniteMarquee('#tweet-marquee');
    }
}

function initHero() {
    const heroImage = document.getElementById('hero-image');
    const container = document.getElementById('hero-container');

    container.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const moveX = -((x - width/2) / 30);
        const moveY = -((y - height/2) / 30);

        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    container.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'translate(0px, 0px)';
    });

    updateTokenData();
    setInterval(updateTokenData, 30000);
}

function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide indicator after scrolling 100px
        if (scrollTop > 100) {
            scrollIndicator.classList.remove('opacity-100');
            scrollIndicator.classList.add('opacity-0');
        } else {
            scrollIndicator.classList.remove('opacity-0');
            scrollIndicator.classList.add('opacity-100');
        }
        
        lastScrollTop = scrollTop;
    });

    // Handle click to scroll
    scrollIndicator.addEventListener('click', () => {
        const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = currentPosition + 300; // Scroll down by 300px

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

function initBuyTokensModal() {
    const buyButtons = document.querySelectorAll('.buy-tokens-button');
    const modal = document.getElementById('buy-tokens-modal');
    const closeModal = document.getElementById('close-modal');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

function initRoadmapTimeline() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    const timelineContents = document.querySelectorAll('.timeline-content');

    // Show first content by default
    timelineContents[0].classList.remove('hidden');

    timelineCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Hide all contents
            timelineContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected content
            timelineContents[index].classList.remove('hidden');

            // Update active card styling
            timelineCards.forEach(c => {
                c.querySelector('div').classList.remove('border-accent-primary');
                c.querySelector('div').classList.add('border-gray-800/50');
                c.querySelector('h3').classList.remove('text-accent-primary');
                c.querySelector('h3').classList.add('text-gray-300');
            });

            // Style active card
            card.querySelector('div').classList.remove('border-gray-800/50');
            card.querySelector('div').classList.add('border-accent-primary');
            card.querySelector('h3').classList.remove('text-gray-300');
            card.querySelector('h3').classList.add('text-accent-primary');
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initScrollIndicator();
    initAccordions();
    initMarquee();
    initBuyTokensModal();
    initRoadmapTimeline();
});