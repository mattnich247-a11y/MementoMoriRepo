export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  source: string;
  theme: 'stoic' | 'existential' | 'poetic' | 'mindfulness';
  dailyPrompt: string;
}

export const QUOTES: QuoteItem[] = [
  {
    id: 'seneca-shortness',
    quote: "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough if you know how to use it.",
    author: "Lucius Annaeus Seneca",
    source: "On the Shortness of Life, c. 49 AD",
    theme: "stoic",
    dailyPrompt: "What single activity are you giving time to today that does not deserve your finite hours?"
  },
  {
    id: 'marcus-morning',
    quote: "When you arise in the morning think of what a privilege it is to be alive: to think, to enjoy, to love.",
    author: "Marcus Aurelius",
    source: "Meditations, Book V",
    theme: "stoic",
    dailyPrompt: "Name one simple physical sensation or relationship you can savor with fresh gratitude today."
  },
  {
    id: 'burkeman-weeks',
    quote: "The average human lifespan is absurdly, terrifyingly, insultingly short. Assuming you reach eighty, you'll have had about four thousand weeks.",
    author: "Oliver Burkeman",
    source: "Four Thousand Weeks: Time Management for Mortals",
    theme: "existential",
    dailyPrompt: "If this week is one of your four thousand, what makes it worth having lived?"
  },
  {
    id: 'steve-jobs-death',
    quote: "Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart.",
    author: "Steve Jobs",
    source: "Stanford Commencement Address, 2005",
    theme: "existential",
    dailyPrompt: "What bold conversation or creative step are you postponing out of fear of looking foolish?"
  },
  {
    id: 'mary-oliver-wild',
    quote: "Tell me, what is it you plan to do with your one wild and precious life?",
    author: "Mary Oliver",
    source: "The Summer Day",
    theme: "poetic",
    dailyPrompt: "Where can you bring wild curiosity or tenderness into your routine today?"
  },
  {
    id: 'epictetus-now',
    quote: "How long are you going to wait before you demand the best for yourself? You have heard the philosophical principles; you claim to understand them. Act now.",
    author: "Epictetus",
    source: "Enchiridion, §51",
    theme: "stoic",
    dailyPrompt: "What standard of behavior or focus will you uphold today without waiting for permission?"
  },
  {
    id: 'montaigne-art',
    quote: "To study philosophy is nothing else but to prepare one's self to die. He who has learned how to die has unlearned how to be a slave.",
    author: "Michel de Montaigne",
    source: "Essays, 1580",
    theme: "existential",
    dailyPrompt: "What obligation are you carrying that only exists in your imagined need to please others?"
  },
  {
    id: 'alan-watts-present',
    quote: "This is the real secret of life — to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play.",
    author: "Alan Watts",
    source: "The Wisdom of Insecurity",
    theme: "mindfulness",
    dailyPrompt: "Can you approach your next 90 minutes of focused effort as a craft rather than a burden?"
  },
  {
    id: 'marcus-dying',
    quote: "You could leave life right now. Let that determine what you do and say and think.",
    author: "Marcus Aurelius",
    source: "Meditations, Book II",
    theme: "stoic",
    dailyPrompt: "If today were your closing chapter, what would you want your final actions to reflect?"
  },
  {
    id: 'frankl-meaning',
    quote: "Live as if you were living already for the second time and as if you had acted the first time as wrongly as you are about to act now.",
    author: "Viktor E. Frankl",
    source: "Man's Search for Meaning",
    theme: "existential",
    dailyPrompt: "What course correction can you make today that your future self will thank you for?"
  },
  {
    id: 'seneca-balance',
    quote: "Let us prepare our minds as if we’d come to the very end of life. Let us postpone nothing. Let us balance life's books each day.",
    author: "Lucius Annaeus Seneca",
    source: "Letters from a Stoic, Letter 101",
    theme: "stoic",
    dailyPrompt: "What unresolved debt of kindness or honesty can you settle today?"
  },
  {
    id: 'twain-fear',
    quote: "The fear of death follows from the fear of life. A person who lives fully is prepared to die at any time.",
    author: "Mark Twain",
    source: "Notebook, 1897",
    theme: "existential",
    dailyPrompt: "Where are you holding back from living with full sincerity right now?"
  },
  {
    id: 'marcus-beginning',
    quote: "It is not death that a man should fear, but he should fear never beginning to live.",
    author: "Marcus Aurelius",
    source: "Meditations, Book XII",
    theme: "stoic",
    dailyPrompt: "What dream or discipline have you kept on the sideline of your life?"
  },
  {
    id: 'murakami-part',
    quote: "Death is not the opposite of life, but an essential part of it. It is the dark frame that gives the painting its light.",
    author: "Haruki Murakami",
    source: "Norwegian Wood",
    theme: "poetic",
    dailyPrompt: "How does knowing today is finite change the flavor of this morning?"
  },
  {
    id: 'seneca-peace',
    quote: "No person can have a peaceful life who thinks too much about lengthening it. Think instead about deepening it.",
    author: "Lucius Annaeus Seneca",
    source: "Moral Letters to Lucilius, Letter 4",
    theme: "stoic",
    dailyPrompt: "Choose depth of attention over mere passage of hours."
  },
  {
    id: 'socrates-unexamined',
    quote: "The unexamined life is not worth living, but to examine life honestly requires facing that it will one day conclude.",
    author: "Socrates",
    source: "Plato's Apology, 399 BC",
    theme: "stoic",
    dailyPrompt: "Examine your priorities today against the backdrop of eternity."
  },
  {
    id: 'tolstoy-death-ivan',
    quote: "Death is finished, he said to himself. It is no more! And in place of death there was light.",
    author: "Leo Tolstoy",
    source: "The Death of Ivan Ilyich, 1886",
    theme: "existential",
    dailyPrompt: "What artificial pretenses can you strip away to live genuinely right now?"
  },
  {
    id: 'cicero-philosophy',
    quote: "The life of the dead is placed in the memory of the living. To philosophize is to learn how to live without the fear of ceasing to be.",
    author: "Marcus Tullius Cicero",
    source: "Tusculan Disputations, 45 BC",
    theme: "stoic",
    dailyPrompt: "What quiet impression do you wish to leave in the hearts of those around you?"
  },
  {
    id: 'rilke-living',
    quote: "Let everything happen to you: beauty and terror. Just keep going. No feeling is final.",
    author: "Rainer Maria Rilke",
    source: "Book of Hours: Love Poems to God",
    theme: "poetic",
    dailyPrompt: "Embrace the full emotional spectrum of today without turning away."
  },
  {
    id: 'epicurus-death',
    quote: "Death does not concern us, because as long as we exist, death is not here. And when it does come, we no longer are.",
    author: "Epicurus",
    source: "Letter to Menoeceus, c. 300 BC",
    theme: "mindfulness",
    dailyPrompt: "Release anxiety over the future and immerse your awareness in this present moment."
  },
  {
    id: 'watts-present',
    quote: "To have a future is impossible when you are not fully present in the here and now.",
    author: "Alan Watts",
    source: "The Wisdom of Insecurity",
    theme: "mindfulness",
    dailyPrompt: "Pause and notice the sounds, textures, and breaths happening around you right now."
  },
  {
    id: 'frankl-second-time',
    quote: "Live as if you were living already for the second time and as if you had acted the first time as wrongly as you are about to act now.",
    author: "Viktor Frankl",
    source: "Man's Search for Meaning",
    theme: "existential",
    dailyPrompt: "If you had a second chance at today, what careless choice would you correct right now?"
  },
  {
    id: 'thoreau-deliberate',
    quote: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.",
    author: "Henry David Thoreau",
    source: "Walden, 1854",
    theme: "poetic",
    dailyPrompt: "What non-essential distraction can you strip away today to touch the genuine core of living?"
  },
  {
    id: 'seneca-fear-death',
    quote: "He who fears death will never do anything worthy of a man who is alive.",
    author: "Lucius Annaeus Seneca",
    source: "Moral Letters to Lucilius, Letter 123",
    theme: "stoic",
    dailyPrompt: "Where is fear of ending holding you back from truly beginning?"
  },
  {
    id: 'marcus-leave-life',
    quote: "You could leave life right now. Let that determine what you do and say and think.",
    author: "Marcus Aurelius",
    source: "Meditations, Book II.11",
    theme: "stoic",
    dailyPrompt: "If tonight were your final evening, would your current priorities still feel urgent?"
  },
  {
    id: 'beauvoir-change-life',
    quote: "Change your life today. Don't gamble on the future, act now, without delay.",
    author: "Simone de Beauvoir",
    source: "The Ethics of Ambiguity",
    theme: "existential",
    dailyPrompt: "What meaningful change have you delayed that can take its first tangible breath today?"
  },
  {
    id: 'rumi-holding-letting-go',
    quote: "Life is a balance of holding on and letting go.",
    author: "Jalal al-Din Rumi",
    source: "The Masnavi",
    theme: "mindfulness",
    dailyPrompt: "What resentment or past expectation are you ready to tenderly let go of today?"
  },
  {
    id: 'gibran-naked-wind',
    quote: "For what is it to die but to stand naked in the wind and to melt into the sun? And when the earth shall claim your limbs, then shall you truly dance.",
    author: "Kahlil Gibran",
    source: "The Prophet, 1923",
    theme: "poetic",
    dailyPrompt: "See mortality not as a cliff, but as nature's quiet return to the universal elements."
  },
  {
    id: 'montaigne-every-day',
    quote: "Every day travels toward death; the last day arrives at it.",
    author: "Michel de Montaigne",
    source: "Essays, Book I",
    theme: "stoic",
    dailyPrompt: "Treat today not as a prelude to tomorrow, but as a complete masterpiece in itself."
  },
  {
    id: 'pascal-hope-living',
    quote: "We never live; we are always in the hope of living. And, ever planning to be happy, it is inevitable that we never become so.",
    author: "Blaise Pascal",
    source: "Pensées, 1670",
    theme: "existential",
    dailyPrompt: "Stop waiting for circumstances to align; taste whatever simple joy is available today."
  },
  {
    id: 'emerson-depth',
    quote: "It is not the length of life, but the depth of life that matters.",
    author: "Ralph Waldo Emerson",
    source: "Essays and Lectures",
    theme: "poetic",
    dailyPrompt: "How can you deepen one conversation or solitary moment today rather than skimming past?"
  },
  {
    id: 'schopenhauer-little-life',
    quote: "Each day is a little life: every waking and rising a little birth, every fresh morning a little youth, every going to rest and sleep a little death.",
    author: "Arthur Schopenhauer",
    source: "Parerga and Paralipomena, 1851",
    theme: "existential",
    dailyPrompt: "Honor today as a complete lifetime from morning sun to evening rest."
  },
  {
    id: 'heraclitus-river',
    quote: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
    author: "Heraclitus",
    source: "Fragments, c. 500 BC",
    theme: "mindfulness",
    dailyPrompt: "Accept the unstoppable river of change and celebrate who you are becoming today."
  },
  {
    id: 'mary-oliver-unimaginable',
    quote: "Keep some room in your heart for the unimaginable.",
    author: "Mary Oliver",
    source: "Evidence: Poems",
    theme: "poetic",
    dailyPrompt: "Leave open space on your calendar and in your mind for quiet wonder to find you."
  },
  {
    id: 'burkeman-price-prioritizing',
    quote: "The price of prioritizing is that you have to choose to let certain things fall by the wayside. The real problem isn't having too little time—it's that we have too many things we'd like to do with it.",
    author: "Oliver Burkeman",
    source: "Four Thousand Weeks",
    theme: "existential",
    dailyPrompt: "What acceptable sacrifice are you willing to make today to protect what matters most?"
  },
  {
    id: 'seneca-tale-life',
    quote: "As is a tale, so is life: not how long it is, but how good it is, is what matters.",
    author: "Lucius Annaeus Seneca",
    source: "Epistulae Morales, Letter 77",
    theme: "stoic",
    dailyPrompt: "If today were a single chapter in your story, write it with honor and care."
  },
  {
    id: 'marcus-stars',
    quote: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
    author: "Marcus Aurelius",
    source: "Meditations, Book VII.47",
    theme: "poetic",
    dailyPrompt: "Look up at the open sky today and feel the peaceful vastness of your cosmos."
  },
  {
    id: 'epictetus-embody',
    quote: "Don't explain your philosophy. Embody it.",
    author: "Epictetus",
    source: "Enchiridion, §46",
    theme: "stoic",
    dailyPrompt: "Let your patience and generosity speak through actions rather than words today."
  },
  {
    id: 'tolstoy-perfection',
    quote: "If you look for perfection, you'll never be content. The goal of life is not happiness, but to grow in love.",
    author: "Leo Tolstoy",
    source: "Anna Karenina, 1877",
    theme: "existential",
    dailyPrompt: "Forgive an imperfection in yourself or someone close to you today."
  },
  {
    id: 'rilke-within',
    quote: "The only journey is the one within. Do not be afraid of suffering; give your heaviness back to the weight of the earth.",
    author: "Rainer Maria Rilke",
    source: "Letters to a Young Poet",
    theme: "poetic",
    dailyPrompt: "Sit quietly for two minutes and listen to what your quiet inner voice is whispering."
  },
  {
    id: 'borges-single-moment',
    quote: "Any life is made up of a single moment, the moment in which a person finds out, once and for all, who they are.",
    author: "Jorge Luis Borges",
    source: "A Biography of Tadeo Isidoro Cruz",
    theme: "existential",
    dailyPrompt: "Stand firmly in your core values when faced with a crossroad today."
  },
  {
    id: 'camus-invincible-summer',
    quote: "In the midst of winter, I found there was, within me, an invincible summer. And that makes me happy. For it says that no matter how hard the world pushes against me, within me, there’s something stronger.",
    author: "Albert Camus",
    source: "Return to Tipasa, 1952",
    theme: "existential",
    dailyPrompt: "Draw upon that quiet, invincible spark of life inside you during tough moments."
  },
  {
    id: 'dickinson-never-come-again',
    quote: "That it will never come again is what makes life so sweet.",
    author: "Emily Dickinson",
    source: "Selected Poems, c. 1865",
    theme: "poetic",
    dailyPrompt: "Taste this specific cup of water or breath with the knowledge that this minute is unique."
  },
  {
    id: 'tagore-dawn-come',
    quote: "Death is not extinguishing the light; it is only putting out the lamp because the dawn has come.",
    author: "Rabindranath Tagore",
    source: "Stray Birds, 1916",
    theme: "mindfulness",
    dailyPrompt: "Look toward transition not with fear, but as natural morning breaking over darkness."
  },
  {
    id: 'lao-tzu-one-thread',
    quote: "Life and death are one thread, the same line viewed from different sides.",
    author: "Lao Tzu",
    source: "Tao Te Ching, c. 4th Century BC",
    theme: "mindfulness",
    dailyPrompt: "Allow impermanence to make this living moment shine brighter."
  },
  {
    id: 'jung-privilege-lifetime',
    quote: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Gustav Jung",
    source: "Memories, Dreams, Reflections",
    theme: "existential",
    dailyPrompt: "Drop the mask you wear for strangers and express your genuine truth today."
  },
  {
    id: 'kierkegaard-forwards',
    quote: "Life can only be understood backwards; but it must be lived forwards.",
    author: "Søren Kierkegaard",
    source: "Journals, 1843",
    theme: "existential",
    dailyPrompt: "Take one decisive step forward today without waiting for hindsight."
  },
  {
    id: 'nietzsche-why-how',
    quote: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    source: "Twilight of the Idols, 1889",
    theme: "existential",
    dailyPrompt: "Remind yourself of your deepest 'why' before starting your tasks today."
  },
  {
    id: 'cs-lewis-ahead',
    quote: "There are far, far better things ahead than any we leave behind.",
    author: "C.S. Lewis",
    source: "Letters to Malcolm",
    theme: "poetic",
    dailyPrompt: "Turn your face to the horizon with quiet hope and unburdened stride."
  },
  {
    id: 'hesse-letting-go',
    quote: "Some of us think holding on makes us strong, but sometimes it is letting go.",
    author: "Hermann Hesse",
    source: "Siddhartha, 1922",
    theme: "mindfulness",
    dailyPrompt: "Release control over an outcome you cannot change, and focus on your inner peace."
  },
  {
    id: 'woolf-look-life-face',
    quote: "To look life in the face, always, to look life in the face, and to know it for what it is. At last to love it for what it is, and then, to put it away.",
    author: "Virginia Woolf",
    source: "The Hours / Diary, 1941",
    theme: "poetic",
    dailyPrompt: "See life as it is today—unfiltered, fragile, poignant—and love it anyway."
  },
  {
    id: 'seneca-separate-life',
    quote: "Begin at once to live, and count each separate day as a separate life.",
    author: "Lucius Annaeus Seneca",
    source: "Moral Letters to Lucilius, Letter 101",
    theme: "stoic",
    dailyPrompt: "Start fresh right this hour, treating whatever happened earlier as yesterday's chapter."
  },
  {
    id: 'marcus-confine-present',
    quote: "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.",
    author: "Marcus Aurelius",
    source: "Meditations, Book VII.8",
    theme: "stoic",
    dailyPrompt: "Bring your scattered thoughts back from next month to the task right in front of you."
  },
  {
    id: 'epictetus-rejoice-has',
    quote: "He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.",
    author: "Epictetus",
    source: "Fragments, §129",
    theme: "stoic",
    dailyPrompt: "Count three blessings you currently take for granted that someone else would cherish."
  },
  {
    id: 'montaigne-nature-chance',
    quote: "Let us give nature a chance; she knows her business better than we do.",
    author: "Michel de Montaigne",
    source: "Essays, Book III",
    theme: "mindfulness",
    dailyPrompt: "Trust the natural rhythm of healing and rest rather than forcing instant answers."
  },
  {
    id: 'watts-join-dance',
    quote: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    author: "Alan Watts",
    source: "The Wisdom of Insecurity",
    theme: "mindfulness",
    dailyPrompt: "Instead of resisting today's unexpected turn, dance with what unfolds."
  },
  {
    id: 'thich-nhat-hanh-smile',
    quote: "Smile, breathe, and go slowly. There is no need to hurry. We have nowhere else to go.",
    author: "Thich Nhat Hanh",
    source: "Peace Is Every Step",
    theme: "mindfulness",
    dailyPrompt: "Take three conscious slow breaths right now, unclench your jaw, and smile."
  },
  {
    id: 'lincoln-life-in-years',
    quote: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    source: "Speeches and Letters",
    theme: "existential",
    dailyPrompt: "Inject genuine presence, curiosity, and vitality into the next sixty minutes."
  },
  {
    id: 'shaw-thoroughly-used-up',
    quote: "I want to be thoroughly used up when I die, for the harder I work the more I live. I rejoice in life for its own sake.",
    author: "George Bernard Shaw",
    source: "Man and Superman, Epistle Dedicatory",
    theme: "existential",
    dailyPrompt: "Pour your sincere energy into a task that serves others without withholding yourself."
  },
  {
    id: 'longfellow-psalm-life',
    quote: "Life is real! Life is earnest! And the grave is not its goal; Dust thou art, to dust returnest, Was not spoken of the soul.",
    author: "Henry Wadsworth Longfellow",
    source: "A Psalm of Life, 1838",
    theme: "poetic",
    dailyPrompt: "Remember that your love, art, and kindness echo beyond your physical boundary."
  },
  {
    id: 'shakespeare-dreams-sleep',
    quote: "We are such stuff as dreams are made on, and our little life is rounded with a sleep.",
    author: "William Shakespeare",
    source: "The Tempest, Act IV, Scene 1",
    theme: "poetic",
    dailyPrompt: "Recognize the wondrous, dreamlike magic of possessing consciousness today."
  },
  {
    id: 'odonohue-sacred-gift',
    quote: "May you experience each day as a sacred gift woven around the heart of wonder.",
    author: "John O'Donohue",
    source: "To Bless the Space Between Us",
    theme: "poetic",
    dailyPrompt: "Approach a common everyday sight with the reverent eyes of a traveler seeing it for the first time."
  },
  {
    id: 'whitman-verse',
    quote: "The powerful play goes on, and you may contribute a verse.",
    author: "Walt Whitman",
    source: "Leaves of Grass, 'O Me! O Life!'",
    theme: "poetic",
    dailyPrompt: "What generous, courageous verse will your actions write into the world today?"
  },
  {
    id: 'seneca-postponing',
    quote: "While we are postponing, life speeds by. Life is very short and anxious for those who forget the past, neglect the present, and fear the future.",
    author: "Lucius Annaeus Seneca",
    source: "On the Shortness of Life, §9",
    theme: "stoic",
    dailyPrompt: "Do not put off that kind word or creative spark until 'tomorrow'—give it life now."
  },
  {
    id: 'marcus-confine',
    quote: "Confine yourself to the present. The art of living is more like wrestling than dancing, in so far as it stands ready against the accidental and the unforeseen.",
    author: "Marcus Aurelius",
    source: "Meditations, Book VII.61",
    theme: "stoic",
    dailyPrompt: "Anchor your feet firmly in this hour and handle just what is here."
  },
  {
    id: 'rumi-another-form',
    quote: "Do not grieve. Anything you lose comes round in another form.",
    author: "Jalal al-Din Rumi",
    source: "The Divan",
    theme: "poetic",
    dailyPrompt: "Look for the new seeds of wisdom sprouting from past losses."
  },
  {
    id: 'frankl-change-ourselves',
    quote: "When we are no longer able to change a situation, we are challenged to change ourselves.",
    author: "Viktor Frankl",
    source: "Man's Search for Meaning",
    theme: "existential",
    dailyPrompt: "Where external circumstances cannot be changed, what inner attitude can you elevate?"
  },
  {
    id: 'mary-oliver-pay-attention',
    quote: "Instructions for living a life: Pay attention. Be astonished. Tell about it.",
    author: "Mary Oliver",
    source: "Red Bird, 'Sometimes'",
    theme: "poetic",
    dailyPrompt: "Pay complete, undivided attention to someone who is speaking to you today."
  },
  {
    id: 'burkeman-stop-anxious',
    quote: "Once you truly understand that you're never going to get on top of everything, you can stop feeling anxious that you haven't yet done so.",
    author: "Oliver Burkeman",
    source: "Four Thousand Weeks",
    theme: "existential",
    dailyPrompt: "Exhale the fantasy of completion; choose today's few meaningful efforts with joy."
  },
  {
    id: 'seneca-part-every-day',
    quote: "Every day we die a little. For every day takes a part of our life away, and even while we are growing, our life is decreasing.",
    author: "Lucius Annaeus Seneca",
    source: "Moral Letters to Lucilius, Letter 24",
    theme: "stoic",
    dailyPrompt: "Treat this day as irreplaceable currency that you are spending right now."
  },
  {
    id: 'ld-1',
    quote: "Think of yourself as dead. You have lived your life. Now take what's left and live it properly.",
    author: "Marcus Aurelius",
    source: "Meditations, Book IV",
    theme: "stoic",
    dailyPrompt: "If your previous life ended yesterday, what fresh freedom does today give you?"
  },
  {
    id: 'ld-2',
    quote: "You act like mortals in all that you fear, and like immortals in all that you desire.",
    author: "Lucius Annaeus Seneca",
    source: "On the Shortness of Life",
    theme: "stoic",
    dailyPrompt: "What desire can you simplify today knowing that time is scarce?"
  },
  {
    id: 'ld-3',
    quote: "Keep death and exile, and all such things which appear terrible, daily before your eyes... and you will never entertain any abject thought.",
    author: "Epictetus",
    source: "Discourses, Book I",
    theme: "stoic",
    dailyPrompt: "Let the presence of mortality dissolve today's petty irritations."
  },
  {
    id: 'ld-4',
    quote: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.",
    author: "Henry David Thoreau",
    source: "Walden, 1854",
    theme: "existential",
    dailyPrompt: "What is the single most essential task in front of you today?"
  },
  {
    id: 'ld-5',
    quote: "To live in this world, you must be able to do three things: to love what is mortal; to hold it against your bones knowing your own life depends on it; and, when the time comes to let it go, to let it go.",
    author: "Mary Oliver",
    source: "In Blackwater Woods",
    theme: "poetic",
    dailyPrompt: "Hold an ordinary moment or relationship with tender awareness of its transience."
  },
  {
    id: 'ld-6',
    quote: "Death is the side of life that is turned away from us, the side on which we are not illuminated.",
    author: "Rainer Maria Rilke",
    source: "Letters to a Young Poet",
    theme: "poetic",
    dailyPrompt: "Consider what quiet depth mortality gives to the beauty of the visible world."
  },
  {
    id: 'ld-7',
    quote: "What is to give light must endure burning.",
    author: "Viktor Frankl",
    source: "The Will to Meaning",
    theme: "existential",
    dailyPrompt: "Where can you channel your current exertion or difficulty into meaningful light?"
  },
  {
    id: 'ld-8',
    quote: "My formula for greatness in a human being is amor fati: that one wants nothing to be different, not forward, not backward, not in all eternity.",
    author: "Friedrich Nietzsche",
    source: "Ecce Homo, 1888",
    theme: "existential",
    dailyPrompt: "Can you love the exact hand life has dealt you today, without wishing for another?"
  },
  {
    id: 'ld-9',
    quote: "Birth and death are only notions. When you look deeply into a cloud, you see that it cannot die; it only transforms into rain or snow.",
    author: "Thich Nhat Hanh",
    source: "No Death, No Fear",
    theme: "mindfulness",
    dailyPrompt: "Notice how all things around you are in gentle, ceaseless transformation."
  },
  {
    id: 'ld-10',
    quote: "For what is it to die but to stand naked in the wind and to melt into the sun? And what is to cease breathing, but to free the breath from its restless tides?",
    author: "Kahlil Gibran",
    source: "The Prophet, 'On Death'",
    theme: "poetic",
    dailyPrompt: "Take three slow, conscious breaths and acknowledge the miracle of breath itself."
  },
  {
    id: 'ld-11',
    quote: "One's life has value so long as one attributes value to the life of others, by means of love, friendship, indignation and compassion.",
    author: "Simone de Beauvoir",
    source: "All Men Are Mortal",
    theme: "existential",
    dailyPrompt: "Whose day can you brighten with authentic attention or care?"
  },
  {
    id: 'ld-12',
    quote: "Time is the substance from which I am made. Time is a river which carries me along, but I am the river; it is a tiger that devours me, but I am the tiger.",
    author: "Jorge Luis Borges",
    source: "Other Inquisitions",
    theme: "poetic",
    dailyPrompt: "Recognize that you are not losing time; you are the living flow of time."
  },
  {
    id: 'ld-13',
    quote: "The present is never our end. The past and the present are our means, the future alone is our end. Thus we never actually live, but a hope to live.",
    author: "Blaise Pascal",
    source: "Pensées, §172",
    theme: "existential",
    dailyPrompt: "Catch yourself postponing living and inhabit this precise hour."
  },
  {
    id: 'ld-14',
    quote: "Real presence is the greatest gift you can bring to any encounter. When you are fully there, you consecrate time.",
    author: "John O'Donohue",
    source: "Anam Cara",
    theme: "mindfulness",
    dailyPrompt: "Offer someone your full, unhurried, listening presence today."
  },
  {
    id: 'ld-15',
    quote: "Days and months are the travelers of eternity. So are the years that pass by. Every minute of our lives is a step on this journey.",
    author: "Matsuo Bashō",
    source: "The Narrow Road to the Deep North",
    theme: "poetic",
    dailyPrompt: "Walk with the lightness of a wanderer through today's appointments."
  },
  {
    id: 'ld-16',
    quote: "What do we live for, if it is not to make life less difficult for each other?",
    author: "George Eliot",
    source: "Middlemarch, 1871",
    theme: "existential",
    dailyPrompt: "What small burden can you lift from a family member, coworker, or friend?"
  },
  {
    id: 'ld-17',
    quote: "I exist as I am, that is enough; if no other in the world be aware I sit content, and if each and all be aware I sit content.",
    author: "Walt Whitman",
    source: "Song of Myself",
    theme: "poetic",
    dailyPrompt: "Drop the need to perform or impress; exist with quiet self-acceptance."
  },
  {
    id: 'ld-18',
    quote: "Remember how brief is the span between birth and death, and how immense the abyss of time before and after.",
    author: "Marcus Aurelius",
    source: "Meditations, Book IV.48",
    theme: "stoic",
    dailyPrompt: "Zoom out to cosmological perspective and observe how small today's anxiety really is."
  },
  {
    id: 'ld-19',
    quote: "A gem cannot be polished without friction, nor a person perfected without trials.",
    author: "Lucius Annaeus Seneca",
    source: "On Providence",
    theme: "stoic",
    dailyPrompt: "View today's friction as the very stone polishing your character."
  },
  {
    id: 'ld-20',
    quote: "Never say of anything, 'I have lost it,' but only, 'I have returned it.' Whatever was lent to you by nature must one day return.",
    author: "Epictetus",
    source: "Enchiridion, §11",
    theme: "stoic",
    dailyPrompt: "Practice non-attachment to possessions and titles; treat them as temporary loans."
  },
  {
    id: 'ld-21',
    quote: "Let us disarm death of its strange novelty, let us converse and be familiar with it, having nothing so often in our thoughts as death.",
    author: "Michel de Montaigne",
    source: "Essays, Book I",
    theme: "existential",
    dailyPrompt: "Greet the thought of your mortality not with fear, but as a wise counselor."
  },
  {
    id: 'ld-22',
    quote: "A free person thinks of nothing less than of death, and their wisdom is not a meditation upon death, but upon life.",
    author: "Baruch Spinoza",
    source: "Ethics, Part IV",
    theme: "existential",
    dailyPrompt: "Channel the awareness of death into vibrant, active love for living."
  },
  {
    id: 'ld-23',
    quote: "Life is not a problem to be solved, but a reality to be experienced.",
    author: "Søren Kierkegaard",
    source: "Either/Or, 1843",
    theme: "existential",
    dailyPrompt: "Stop analyzing every detail and allow life to simply be felt."
  },
  {
    id: 'ld-24',
    quote: "If it be now, 'tis not to come; if it be not to come, it will be now; if it be not now, yet it will come—the readiness is all.",
    author: "William Shakespeare",
    source: "Hamlet, Act V",
    theme: "stoic",
    dailyPrompt: "Cultivate inner readiness and composure for whatever this day brings."
  },
  {
    id: 'ld-25',
    quote: "It seems to me that one ought to rejoice in the fact of death—ought to decide, indeed, to earn one's death by confronting with passion the conundrum of life.",
    author: "James Baldwin",
    source: "The Fire Next Time",
    theme: "existential",
    dailyPrompt: "Engage your work and relationships with wholehearted passion."
  },
  {
    id: 'ld-26',
    quote: "He who fears death will never do anything worthy of a person who is alive.",
    author: "Lucius Annaeus Seneca",
    source: "On Tranquility of Mind",
    theme: "stoic",
    dailyPrompt: "Take one courageous step that your timidity has been discouraging."
  },
  {
    id: 'ld-27',
    quote: "Pass then through this little space of time conformably to nature, and end your journey in contentment, just as an olive falls off when it is ripe.",
    author: "Marcus Aurelius",
    source: "Meditations, Book IV.48",
    theme: "stoic",
    dailyPrompt: "Move in harmony with today's natural pace rather than rushing."
  },
  {
    id: 'ld-28',
    quote: "Courage is what is required of us to face the essential vulnerability of being human.",
    author: "David Whyte",
    source: "Consolations: The Solace, Nourishment and Underlying Meaning of Everyday Words",
    theme: "poetic",
    dailyPrompt: "Allow yourself to be vulnerable and honest with someone you trust."
  },
  {
    id: 'ld-29',
    quote: "What is all this continually looking back? One must remain positive and make the best of what remains.",
    author: "Kazuo Ishiguro",
    source: "The Remains of the Day",
    theme: "existential",
    dailyPrompt: "Release past regrets; focus your attention squarely on the hours remaining today."
  },
  {
    id: 'ld-30',
    quote: "I think that what we're really seeking is an experience of being alive, so that our life experiences on the purely physical plane have resonances without that are that of our innermost being.",
    author: "Joseph Campbell",
    source: "The Power of Myth",
    theme: "mindfulness",
    dailyPrompt: "Engage your senses fully—taste your food, feel the air, notice the light."
  },
  {
    id: 'ld-31',
    quote: "Loss is nothing else but change, and change is Nature's delight.",
    author: "Marcus Aurelius",
    source: "Meditations, Book IX.35",
    theme: "stoic",
    dailyPrompt: "Welcome an unexpected shift or disruption today as natural change."
  },
  {
    id: 'ld-32',
    quote: "Unable are the loved to die, for love is immortality.",
    author: "Emily Dickinson",
    source: "Poem 809",
    theme: "poetic",
    dailyPrompt: "Remember someone who shaped your life; keep their legacy alive in your actions."
  },
  {
    id: 'ld-33',
    quote: "For small creatures such as we the vastness is bearable only through love.",
    author: "Carl Sagan",
    source: "Contact, 1985",
    theme: "poetic",
    dailyPrompt: "Send a message of warmth or appreciation to someone who anchors you in this world."
  },
  {
    id: 'ld-34',
    quote: "Just as the wave cannot exist without the whole ocean, you cannot exist without the whole universe.",
    author: "Alan Watts",
    source: "The Book on the Taboo Against Knowing Who You Are",
    theme: "mindfulness",
    dailyPrompt: "Step outside and feel yourself as an inseparable part of the living cosmos."
  },
  {
    id: 'ld-35',
    quote: "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality.",
    author: "Lao Tzu",
    source: "Tao Te Ching",
    theme: "mindfulness",
    dailyPrompt: "Yield gracefully to what is unfolding instead of forcing your will."
  },
  {
    id: 'ld-36',
    quote: "I have had to experience so much despair, so much sorrow, in order to become a child again and begin anew.",
    author: "Hermann Hesse",
    source: "Siddhartha",
    theme: "existential",
    dailyPrompt: "Approach today with the beginner's mind of wonder and curiosity."
  },
  {
    id: 'ld-37',
    quote: "The world that I regard is myself; it is the microcosm of my own frame that I cast my eye on. Master the inner kingdom.",
    author: "Sir Thomas Browne",
    source: "Religio Medici",
    theme: "stoic",
    dailyPrompt: "Rule your thoughts and responses with sovereign calm."
  },
  {
    id: 'ld-38',
    quote: "To light a candle is to cast a shadow... But what you have lived is yours forever.",
    author: "Ursula K. Le Guin",
    source: "A Wizard of Earthsea",
    theme: "poetic",
    dailyPrompt: "Light a small candle of focus and kindness in your corner of the world."
  },
  {
    id: 'ld-39',
    quote: "What makes the desert beautiful is that somewhere it hides a well.",
    author: "Antoine de Saint-Exupéry",
    source: "The Little Prince",
    theme: "poetic",
    dailyPrompt: "Seek the hidden well of meaning beneath today's routine tasks."
  },
  {
    id: 'ld-40',
    quote: "Time is a child playing a board game; the kingdom belongs to the child.",
    author: "Heraclitus",
    source: "Fragments, c. 500 BC",
    theme: "existential",
    dailyPrompt: "Bring a spirit of play and lightness to a task you've taken too seriously."
  },
  {
    id: 'ld-41',
    quote: "Do not act as if you were going to live ten thousand years. Death hangs over you. While you live, while it is in your power, be good.",
    author: "Marcus Aurelius",
    source: "Meditations, Book IV.17",
    theme: "stoic",
    dailyPrompt: "Perform an act of genuine goodness today without expecting anything in return."
  },
  {
    id: 'ld-42',
    quote: "Life is very short and anxious for those who forget the past, neglect the present, and fear the future.",
    author: "Lucius Annaeus Seneca",
    source: "On the Shortness of Life, §16",
    theme: "stoic",
    dailyPrompt: "Release tomorrow's anxiety and inhabit this exact hour with gratitude."
  },
  {
    id: 'ld-43',
    quote: "Don't demand that things happen as you wish, but wish that they happen as they do happen, and you will go on well.",
    author: "Epictetus",
    source: "Enchiridion, §8",
    theme: "stoic",
    dailyPrompt: "When an obstacle arises today, adapt to it with peace rather than resistance."
  },
  {
    id: 'ld-44',
    quote: "The fear of death follows from the fear of life. A person who lives fully is prepared to die at any time.",
    author: "Mark Twain",
    source: "Notebooks",
    theme: "existential",
    dailyPrompt: "Live today with enough fullness and integrity that you have no regrets by nightfall."
  },
  {
    id: 'ld-45',
    quote: "Let your life lightly dance on the edges of Time like dew on the tip of a leaf.",
    author: "Rabindranath Tagore",
    source: "The Gardener",
    theme: "poetic",
    dailyPrompt: "Hold your plans lightly and step gently through the hours."
  },
  {
    id: 'ld-46',
    quote: "We are all walking each other home.",
    author: "Ram Dass",
    source: "Walking Each Other Home",
    theme: "mindfulness",
    dailyPrompt: "Treat everyone you encounter today as a fellow traveler returning home."
  },
  {
    id: 'ld-47',
    quote: "Everything you see has its roots in the unseen world. The forms may change yet the essence remains the same.",
    author: "Jalal al-Din Rumi",
    source: "The Masnavi",
    theme: "poetic",
    dailyPrompt: "Look past physical surfaces and tune into the spirit beneath them."
  },
  {
    id: 'ld-48',
    quote: "To affect the quality of the day, that is the highest of arts. Every person is tasked to make their life, even in its details, worthy of the contemplation of their most elevated hour.",
    author: "Henry David Thoreau",
    source: "Walden, 'Where I Lived, and What I Lived For'",
    theme: "existential",
    dailyPrompt: "Treat today as your canvas; compose it with care and intention."
  },
  {
    id: 'ld-49',
    quote: "Soon you will have forgotten all things; and soon all things will have forgotten you.",
    author: "Marcus Aurelius",
    source: "Meditations, Book VII.21",
    theme: "stoic",
    dailyPrompt: "Let the brevity of worldly fame free you from caring what strangers think."
  },
  {
    id: 'ld-50',
    quote: "I am not afraid of death; I just don't want to be there when it happens. But while I am here, I shall celebrate the astounding gift of being alive.",
    author: "Woody Allen & Stoic Synthesis",
    source: "Without Feathers & Classical Reflections",
    theme: "existential",
    dailyPrompt: "Laugh, appreciate your breath, and savor the miracle of being alive right now."
  }
];

export function getRandomLifeDeathQuote(): QuoteItem {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
}

export const LIFE_CHAPTERS = [
  { name: 'Childhood & Discovery', minAge: 0, maxAge: 18, color: 'text-sky-400', bg: 'bg-sky-400/20' },
  { name: 'Youth & Foundation', minAge: 18, maxAge: 25, color: 'text-emerald-400', bg: 'bg-emerald-400/20' },
  { name: 'Prime Creation & Impact', minAge: 25, maxAge: 50, color: 'text-amber-400', bg: 'bg-amber-400/20' },
  { name: 'Mastery & Mentorship', minAge: 50, maxAge: 65, color: 'text-orange-400', bg: 'bg-orange-400/20' },
  { name: 'Elder Wisdom & Freedom', minAge: 65, maxAge: 95, color: 'text-violet-400', bg: 'bg-violet-400/20' }
];
