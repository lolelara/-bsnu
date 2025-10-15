// Student Data for PHC 3rd Year - BSNU 2026
// Total: 644 Students

const studentsData = [
    { serial: 1, name: "Ibtesam Ahmed Mahmoud Ali", seatNo: "233001", group: 1 },
    { serial: 2, name: "Ahmed Salem Ibrahim Mohamed Salem", seatNo: "220038", group: 1 },
    { serial: 3, name: "Ahmed Saber Ashry Abd Almawla", seatNo: "223006", group: 1 },
    { serial: 4, name: "Ahmed Tarek Mohamed Abd Alwahab", seatNo: "223007", group: 1 },
    { serial: 5, name: "Ahmed Mohsen Ahmed Abd Alrahman", seatNo: "223010", group: 1 },
    // ... Sample data - Add all 644 students from the mark list
    { serial: 35, name: "Student Name 35", seatNo: "230135", group: 1 },
    { serial: 36, name: "Student Name 36", seatNo: "230136", group: 2 },
    { serial: 70, name: "Student Name 70", seatNo: "230170", group: 2 },
    { serial: 71, name: "Student Name 71", seatNo: "230171", group: 3 },
    { serial: 105, name: "Student Name 105", seatNo: "230205", group: 3 },
    { serial: 106, name: "Student Name 106", seatNo: "230206", group: 4 },
    { serial: 140, name: "Student Name 140", seatNo: "230240", group: 4 },
    { serial: 141, name: "Aya Samir Ahmed Taha", seatNo: "230124", group: 5 },
    { serial: 175, name: "Student Name 175", seatNo: "230275", group: 5 },
    { serial: 210, name: "Student Name 210", seatNo: "230310", group: 6 },
    { serial: 245, name: "Student Name 245", seatNo: "230345", group: 7 },
    { serial: 280, name: "Student Name 280", seatNo: "230380", group: 8 },
    { serial: 315, name: "Student Name 315", seatNo: "230415", group: 9 },
    { serial: 350, name: "Student Name 350", seatNo: "230450", group: 10 },
    { serial: 385, name: "Student Name 385", seatNo: "230485", group: 11 },
    { serial: 420, name: "Student Name 420", seatNo: "230520", group: 12 },
    { serial: 455, name: "Student Name 455", seatNo: "230555", group: 13 },
    { serial: 490, name: "Student Name 490", seatNo: "230590", group: 14 },
    { serial: 525, name: "Student Name 525", seatNo: "230625", group: 15 },
    { serial: 560, name: "Student Name 560", seatNo: "230660", group: 16 },
    { serial: 595, name: "Student Name 595", seatNo: "230695", group: 17 },
    { serial: 630, name: "Student Name 630", seatNo: "230730", group: 18 },
    { serial: 644, name: "Student Name 644", seatNo: "230744", group: 19 }
];

// Group Assignments (19 groups, ~34 students each)
const groupRanges = [
    { group: 1, start: 1, end: 35, topic: 1 },
    { group: 2, start: 36, end: 70, topic: 2 },
    { group: 3, start: 71, end: 105, topic: 3 },
    { group: 4, start: 106, end: 140, topic: 4 },
    { group: 5, start: 141, end: 175, topic: 5 },
    { group: 6, start: 176, end: 210, topic: 6 },
    { group: 7, start: 211, end: 245, topic: 7 },
    { group: 8, start: 246, end: 280, topic: 8 },
    { group: 9, start: 281, end: 315, topic: 9 },
    { group: 10, start: 316, end: 350, topic: 10 },
    { group: 11, start: 351, end: 385, topic: 11 },
    { group: 12, start: 386, end: 420, topic: 12 },
    { group: 13, start: 421, end: 455, topic: 13 },
    { group: 14, start: 456, end: 490, topic: 14 },
    { group: 15, start: 491, end: 525, topic: 15 },
    { group: 16, start: 526, end: 560, topic: 16 },
    { group: 17, start: 561, end: 595, topic: 17 },
    { group: 18, start: 596, end: 630, topic: 18 },
    { group: 19, start: 631, end: 644, topic: 19 }
];

// PHC Topics for 3rd Year
const topics = {
    1: { 
        title: "Antenatal Care", 
        subtitle: "What Every Mother Should Know",
        description: "Comprehensive guide to prenatal health and care",
        imagePrompt: "Professional medical photo of a smiling female doctor consulting with a pregnant woman in a modern, clean clinic. Bright, warm, welcoming atmosphere with medical charts in background. High quality, photorealistic.",
        contentPrompt: `Create a comprehensive, evidence-based leaflet about Antenatal Care for Primary Health Care. Structure the content in 3 columns:

Column 1 (Introduction & Importance):
- What is Antenatal Care?
- Why is it crucial for maternal and fetal health?
- Statistics and importance in PHC setting

Column 2 (Key Components):
- Essential antenatal visits schedule
- Important screenings and tests
- Nutrition and lifestyle advice
- Warning signs to watch for

Column 3 (Practical Guidance):
- When and where to get antenatal care
- What to expect at each visit
- Resources and support available
- Call to action for pregnant women

Use clear, accessible English. Include medical accuracy while remaining patient-friendly. Format with headings and bullet points for readability.`
    },
    2: { 
        title: "Danger Signs in Pregnancy", 
        subtitle: "When to Seek Immediate Help",
        description: "Critical warning signs every pregnant woman must know",
        imagePrompt: "Informative medical illustration showing a concerned pregnant woman looking at a checklist of warning signs, with a supportive healthcare provider nearby. Clear, professional, educational style.",
        contentPrompt: `Create an urgent, lifesaving leaflet about Danger Signs in Pregnancy for PHC. Structure in 3 columns:

Column 1 (Understanding Danger Signs):
- Why recognizing danger signs saves lives
- The role of PHC in emergency obstetric care
- Statistics on maternal mortality prevention

Column 2 (Critical Warning Signs):
- Severe bleeding
- Severe headaches/vision problems
- Reduced fetal movement
- Severe abdominal pain
- Water breaking prematurely
- High fever
- Severe swelling

Column 3 (Action Plan):
- What to do when you notice these signs
- Emergency contact numbers
- Where to go for immediate help
- Prevention strategies

Use urgent but calm tone. Clear, bold headings. Emphasize immediate action needed.`
    },
    3: { 
        title: "Physical Activity Promotion", 
        subtitle: "Your Guide to a Healthier Lifestyle",
        description: "Evidence-based strategies for promoting active living",
        imagePrompt: "Vibrant photo of a diverse group of people of different ages doing outdoor exercises in a sunny park - walking, stretching, light jogging. Joyful, energetic, inclusive atmosphere.",
        contentPrompt: `Create an motivating leaflet about Physical Activity Promotion in PHC. Structure in 3 columns:

Column 1 (The Science of Movement):
- What counts as physical activity?
- Health benefits backed by research
- Current activity recommendations for adults
- Role of PHC in promoting active lifestyles

Column 2 (Types & Guidelines):
- Aerobic activities (examples and benefits)
- Strength training basics
- Flexibility exercises
- How much activity you need weekly
- Tips for different age groups

Column 3 (Getting Started):
- Simple ways to add activity to your day
- Overcoming common barriers
- Setting realistic goals
- Local resources and programs
- Track your progress

Encouraging, practical tone. Use motivational language while being realistic.`
    },
    4: { 
        title: "Safe Delivery Practices", 
        subtitle: "Ensuring Mother and Baby's Safety",
        description: "Essential practices for safe childbirth",
        imagePrompt: "Professional medical photo of a calm birthing room in a health facility, with medical equipment neatly arranged, natural light, showing preparedness and safety. Clean, reassuring environment.",
        contentPrompt: `Create a comprehensive leaflet about Safe Delivery Practices in PHC. Structure in 3 columns:

Column 1 (Importance of Safe Delivery):
- Why delivery location matters
- Risks of home delivery without skilled attendant
- Benefits of facility-based delivery
- PHC role in safe delivery

Column 2 (Essential Safe Practices):
- Skilled birth attendant presence
- Clean delivery environment
- Essential equipment and supplies
- Active management of third stage of labor
- Immediate newborn care
- Postpartum monitoring

Column 3 (Planning for Delivery):
- Birth preparedness checklist
- When to go to the health facility
- What to bring
- Danger signs during labor
- Postpartum care planning

Professional, reassuring tone. Emphasize safety and preparation.`
    },
    5: { 
        title: "Postnatal Care", 
        subtitle: "Caring for Mother and Newborn",
        description: "Essential care in the critical weeks after birth",
        imagePrompt: "Tender photo of a healthcare provider checking a newborn baby while the mother watches with a smile, in a bright, clean postnatal care room. Gentle, caring atmosphere.",
        contentPrompt: `Create a comprehensive leaflet about Postnatal Care in PHC. Structure in 3 columns:

Column 1 (Why Postnatal Care Matters):
- Critical period for mother and baby
- Common complications that can be prevented
- PHC services for postnatal care
- Recommended visit schedule

Column 2 (Mother's Health):
- Physical recovery after childbirth
- Warning signs in mother (infection, bleeding, depression)
- Nutrition and rest
- Family planning counseling
- Breastfeeding support

Column 3 (Newborn Care):
- Essential newborn care practices
- Exclusive breastfeeding
- Immunizations
- Danger signs in newborn
- When to bring baby for checkup
- Growth monitoring

Warm, supportive tone. Practical and encouraging.`
    },
    6: { 
        title: "School Health Program", 
        subtitle: "Building Healthy Futures",
        description: "Comprehensive health services for school-age children",
        imagePrompt: "Cheerful photo of diverse school children having a health screening at school, with a nurse checking their height/weight, bright classroom setting, happy and healthy atmosphere.",
        contentPrompt: `Create an informative leaflet about School Health Programs in PHC. Structure in 3 columns:

Column 1 (Overview):
- What is a school health program?
- Importance for child development
- Components of comprehensive school health
- PHC's role in school health

Column 2 (Key Services):
- Regular health screenings
- Immunization programs
- Nutrition education
- Hygiene and sanitation
- First aid and emergency care
- Mental health support
- Chronic disease management

Column 3 (Benefits & Implementation):
- Impact on academic performance
- Disease prevention
- Health education for children
- How schools and PHC collaborate
- Parent involvement
- Building lifelong healthy habits

Educational, professional tone. Emphasize prevention and wellness.`
    },
    7: { 
        title: "Smoking Cessation", 
        subtitle: "Your Journey to a Smoke-Free Life",
        description: "Evidence-based strategies to quit smoking",
        imagePrompt: "Hopeful image of a person breaking a cigarette in half, with sunshine in the background suggesting a new beginning. Inspirational, positive, showing transformation and health.",
        contentPrompt: `Create a motivational leaflet about Smoking Cessation in PHC. Structure in 3 columns:

Column 1 (Understanding Tobacco Addiction):
- Health risks of smoking (cardiovascular, cancer, respiratory)
- Nicotine addiction explained
- Secondhand smoke dangers
- Economic costs of smoking
- Benefits timeline of quitting

Column 2 (Strategies to Quit):
- Nicotine replacement therapy options
- Behavioral techniques
- Medications that can help
- Managing withdrawal symptoms
- Dealing with triggers
- Support systems

Column 3 (PHC Support Services):
- Quit smoking programs available
- Counseling services
- Follow-up and monitoring
- Relapse prevention
- Success stories
- How to access help
- Resources and hotlines

Empowering, non-judgmental tone. Focus on hope and support.`
    },
    8: { 
        title: "Diabetes Prevention & Management", 
        subtitle: "Take Control of Your Health",
        description: "Comprehensive guide to preventing and managing diabetes",
        imagePrompt: "Professional medical image showing blood glucose monitoring device with healthy foods (vegetables, whole grains) in background, clean and educational style.",
        contentPrompt: `Create an educational leaflet about Diabetes Prevention and Management in PHC. Structure in 3 columns:

Column 1 (Understanding Diabetes):
- What is diabetes? Types of diabetes
- Risk factors and causes
- Prevalence and importance in PHC
- Complications if unmanaged
- Why early detection matters

Column 2 (Prevention Strategies):
- Healthy diet principles
- Regular physical activity
- Weight management
- Regular screening for high-risk individuals
- Lifestyle modifications
- Understanding pre-diabetes

Column 3 (Living with Diabetes):
- Blood sugar monitoring
- Medication adherence
- Foot care
- Eye examinations
- Regular PHC follow-up
- Managing complications
- Support resources available

Clear, empowering tone. Balance prevention and management information.`
    },
    9: { 
        title: "Hypertension Control", 
        subtitle: "Managing the Silent Killer",
        description: "Essential knowledge about blood pressure control",
        imagePrompt: "Clean medical photo showing a healthcare provider measuring blood pressure of a patient, professional clinic setting, focus on blood pressure cuff and monitoring device.",
        contentPrompt: `Create an informative leaflet about Hypertension Control in PHC. Structure in 3 columns:

Column 1 (Understanding Hypertension):
- What is high blood pressure?
- Why it's called the "silent killer"
- Normal vs. high blood pressure values
- Risk factors
- Complications (stroke, heart disease, kidney damage)
- Importance of regular screening

Column 2 (Control Strategies):
- DASH diet principles
- Salt reduction
- Regular physical activity
- Weight management
- Stress reduction techniques
- Limiting alcohol
- Quit smoking
- Medication adherence

Column 3 (PHC Services):
- Regular blood pressure monitoring
- Medication management
- Lifestyle counseling
- Follow-up schedule
- When to seek emergency care
- Self-monitoring at home
- Community support programs

Professional, clear tone. Emphasize prevention and control.`
    },
    10: { 
        title: "Childhood Immunization", 
        subtitle: "Protecting Our Children's Future",
        description: "Complete guide to childhood vaccines",
        imagePrompt: "Reassuring photo of a smiling baby receiving a vaccine from a gentle healthcare provider, with parent nearby looking confident and supportive. Bright, clean, professional medical setting.",
        contentPrompt: `Create a comprehensive leaflet about Childhood Immunization in PHC. Structure in 3 columns:

Column 1 (Why Vaccines Matter):
- How vaccines work
- Diseases prevented by immunization
- Herd immunity concept
- Safety and efficacy of vaccines
- Debunking common myths
- Importance in PHC programs

Column 2 (Immunization Schedule):
- Birth to 2 years: essential vaccines
- Pre-school boosters
- School-age immunizations
- What vaccines protect against:
  * BCG (TB)
  * Hepatitis B
  * Polio
  * DTP (Diphtheria, Tetanus, Pertussis)
  * MMR (Measles, Mumps, Rubella)
  * Pneumococcal, Rotavirus, etc.

Column 3 (Practical Information):
- Where to get vaccines (PHC centers)
- Keeping vaccine records
- What to expect during vaccination
- Side effects and management
- Catch-up schedules for delayed vaccines
- Reminder systems
- Free immunization programs

Reassuring, informative tone. Address concerns with facts.`
    },
    11: { 
        title: "Nutrition & Healthy Eating", 
        subtitle: "Fuel Your Body Right",
        description: "Evidence-based nutritional guidance for all ages",
        imagePrompt: "Colorful, appealing photo of a balanced meal with variety of fresh vegetables, whole grains, lean protein, and fruits arranged attractively. Vibrant, appetizing, healthy.",
        contentPrompt: `Create a practical leaflet about Nutrition and Healthy Eating in PHC. Structure in 3 columns:

Column 1 (Nutrition Basics):
- Essential nutrients and their roles
- Balanced diet principles
- Portion sizes and meal planning
- Reading nutrition labels
- Common nutritional deficiencies
- Importance of variety

Column 2 (Healthy Eating Guidelines):
- Fruits and vegetables: 5 a day
- Whole grains over refined
- Lean proteins
- Healthy fats vs. unhealthy fats
- Limiting sugar and salt
- Staying hydrated
- Special considerations (pregnancy, children, elderly)

Column 3 (Making It Work):
- Meal planning tips
- Healthy cooking methods
- Budget-friendly nutritious meals
- Involving family in healthy eating
- Overcoming barriers
- PHC nutrition counseling services
- Resources and recipes

Practical, non-judgmental tone. Focus on achievable changes.`
    },
    12: { 
        title: "Family Planning", 
        subtitle: "Empowering Reproductive Choices",
        description: "Comprehensive reproductive health information",
        imagePrompt: "Professional image of a healthcare provider counseling a couple about family planning options, showing respect and privacy, brochures on table, modern clinic setting.",
        contentPrompt: `Create a comprehensive leaflet about Family Planning in PHC. Structure in 3 columns:

Column 1 (Understanding Family Planning):
- What is family planning?
- Benefits of birth spacing
- Impact on maternal and child health
- Rights and informed choice
- PHC's role in family planning services
- Overcoming myths and misconceptions

Column 2 (Contraceptive Methods):
- Hormonal methods (pills, injectables, implants)
- Barrier methods (condoms, diaphragm)
- Intrauterine devices (IUDs)
- Permanent methods (tubal ligation, vasectomy)
- Natural methods
- Emergency contraception
- Effectiveness rates
- How to choose the right method

Column 3 (Accessing Services):
- Free or subsidized family planning services
- Counseling services available
- Confidentiality and privacy
- Follow-up care
- Dealing with side effects
- When to switch methods
- Dual protection (STI prevention)

Respectful, non-judgmental tone. Emphasize informed choice.`
    },
    13: { 
        title: "Mental Health Awareness", 
        subtitle: "Taking Care of Your Mind",
        description: "Breaking stigma and promoting mental wellness",
        imagePrompt: "Compassionate image showing a person talking to a counselor, peaceful setting with plants, showing hope and support, destigmatizing mental health care.",
        contentPrompt: `Create a sensitive leaflet about Mental Health Awareness in PHC. Structure in 3 columns:

Column 1 (Understanding Mental Health):
- Mental health is health
- Common mental health conditions (depression, anxiety)
- Prevalence and impact
- Breaking the stigma
- Mental health in PHC
- Warning signs to watch for

Column 2 (Maintaining Mental Wellness):
- Stress management techniques
- Importance of social connections
- Physical activity and mental health
- Adequate sleep
- Healthy coping mechanisms
- When to seek help
- Crisis warning signs

Column 3 (Support & Services):
- PHC mental health services
- Counseling availability
- Medication when appropriate
- Support groups
- Emergency mental health contacts
- Resources for families
- Recovery is possible

Compassionate, destigmatizing tone. Emphasize hope and help.`
    },
    14: { 
        title: "Oral Health Care", 
        subtitle: "A Healthy Smile for Life",
        description: "Preventive dental care for all ages",
        imagePrompt: "Bright photo showing a family brushing teeth together, or a close-up of healthy teeth and smile, dental health tools (toothbrush, floss) visible, clean and positive.",
        contentPrompt: `Create an educational leaflet about Oral Health Care in PHC. Structure in 3 columns:

Column 1 (Why Oral Health Matters):
- Connection between oral and overall health
- Common dental problems (cavities, gum disease)
- Impact of poor oral health
- Prevention is key
- Oral health across the lifespan
- PHC's role in oral health

Column 2 (Daily Oral Care):
- Proper brushing technique (2x daily)
- Flossing importance and method
- Choosing the right toothpaste/toothbrush
- Limiting sugary foods and drinks
- Fluoride benefits
- Dental care for children
- Dental care for elderly

Column 3 (Professional Care):
- Regular dental checkups (every 6 months)
- Professional cleaning
- Early cavity detection
- Treatment of dental problems
- Affordable dental services
- When to see a dentist urgently
- PHC dental services available

Educational, practical tone. Emphasize prevention.`
    },
    15: { 
        title: "Infectious Disease Prevention", 
        subtitle: "Protecting Yourself and Others",
        description: "Essential practices to prevent disease spread",
        imagePrompt: "Clear infographic-style image showing handwashing, vaccination, food safety, and other prevention methods, clean and educational medical illustration style.",
        contentPrompt: `Create a practical leaflet about Infectious Disease Prevention in PHC. Structure in 3 columns:

Column 1 (Understanding Transmission):
- How infections spread
- Common infectious diseases in community
- Why prevention matters
- Vulnerable populations
- Role of PHC in disease control
- Outbreak prevention

Column 2 (Prevention Strategies):
- Hand hygiene (proper handwashing)
- Respiratory etiquette (cover coughs)
- Food safety and hygiene
- Safe water and sanitation
- Immunizations
- Avoiding close contact when sick
- Personal protective measures
- Environmental cleaning

Column 3 (PHC Services):
- Vaccination programs
- Disease surveillance
- Early detection and treatment
- Health education
- Contact tracing
- Quarantine and isolation guidance
- Reporting disease outbreaks
- Community health interventions

Clear, practical tone. Emphasize simple effective measures.`
    },
    16: { 
        title: "Chronic Disease Management", 
        subtitle: "Living Well with Long-term Conditions",
        description: "Strategies for managing chronic health conditions",
        imagePrompt: "Empowering image of an older adult taking medication with a pill organizer, healthy meal nearby, exercise equipment, showing successful management of chronic condition.",
        contentPrompt: `Create an empowering leaflet about Chronic Disease Management in PHC. Structure in 3 columns:

Column 1 (Understanding Chronic Diseases):
- What are chronic diseases?
- Common chronic conditions (diabetes, hypertension, COPD, etc.)
- Impact on quality of life
- Importance of ongoing management
- Preventing complications
- PHC's central role

Column 2 (Self-Management Strategies):
- Medication adherence
- Regular monitoring (blood sugar, blood pressure, etc.)
- Lifestyle modifications
- Symptom management
- Managing multiple conditions
- Keeping health records
- Using technology (apps, reminders)

Column 3 (PHC Support):
- Regular follow-up appointments
- Care coordination
- Patient education programs
- Specialist referrals when needed
- Laboratory and diagnostic services
- Managing acute flare-ups
- Support groups and resources
- Long-term care planning

Empowering, realistic tone. Balance optimism with practical advice.`
    },
    17: { 
        title: "Elderly Care & Healthy Aging", 
        subtitle: "Adding Life to Years",
        description: "Comprehensive care for healthy aging",
        imagePrompt: "Dignified photo of active, healthy elderly people engaged in social activities or light exercise, smiling, showing vitality and quality of life in older age.",
        contentPrompt: `Create a respectful leaflet about Elderly Care and Healthy Aging in PHC. Structure in 3 columns:

Column 1 (Healthy Aging Principles):
- What is healthy aging?
- Common health challenges in elderly
- Maintaining independence and dignity
- Comprehensive geriatric assessment
- PHC services for elderly
- Prevention of age-related decline

Column 2 (Key Health Areas):
- Nutrition in elderly (adequate protein, calcium, vitamins)
- Physical activity (balance, strength, flexibility)
- Cognitive health (preventing dementia)
- Medication management (polypharmacy issues)
- Fall prevention
- Sensory impairments (vision, hearing)
- Social engagement

Column 3 (Support Services):
- Regular health checkups
- Chronic disease management
- Home visits for homebound elderly
- Caregiver support and education
- Community resources
- Long-term care options
- End-of-life care planning
- Respite care

Respectful, dignified tone. Focus on quality of life and independence.`
    },
    18: { 
        title: "Environmental Health", 
        subtitle: "A Healthy Environment for All",
        description: "Understanding environmental impacts on health",
        imagePrompt: "Clean image showing clean water, proper waste disposal, green environment, air quality monitoring, representing healthy environmental practices.",
        contentPrompt: `Create an informative leaflet about Environmental Health in PHC. Structure in 3 columns:

Column 1 (Environmental Health Basics):
- What is environmental health?
- How environment affects health
- Common environmental health hazards
- Air quality and respiratory health
- Water safety
- PHC's role in environmental health

Column 2 (Key Environmental Issues):
- Safe water and sanitation
- Air pollution (indoor and outdoor)
- Proper waste disposal
- Food safety and hygiene
- Vector control (mosquitoes, flies, rodents)
- Occupational hazards
- Chemical exposures
- Climate change and health

Column 3 (Protecting Health):
- Household water treatment
- Improving indoor air quality
- Proper waste management at home
- Pest control methods
- Safe food handling
- Reducing personal exposures
- Community environmental initiatives
- Reporting environmental hazards to PHC

Educational, practical tone. Empower individual and community action.`
    },
    19: { 
        title: "Adolescent Health", 
        subtitle: "Navigating the Teen Years",
        description: "Health and wellness for adolescents",
        imagePrompt: "Positive image of diverse teenagers engaged in healthy activities - sports, studying, socializing in healthy ways, showing confidence and wellbeing.",
        contentPrompt: `Create a youth-friendly leaflet about Adolescent Health in PHC. Structure in 3 columns:

Column 1 (Understanding Adolescence):
- Physical changes during puberty
- Emotional and psychological development
- Common health challenges in teens
- Importance of adolescent-friendly services
- Confidentiality in PHC
- Establishing healthy habits for life

Column 2 (Key Health Topics):
- Nutrition needs for growing teens
- Physical activity and fitness
- Mental health and stress management
- Sexual and reproductive health education
- Substance abuse prevention (smoking, alcohol, drugs)
- Bullying and peer pressure
- Screen time and digital wellness
- Sleep importance

Column 3 (PHC Services for Teens):
- Confidential health counseling
- Immunizations (HPV, meningitis, etc.)
- Sexual health services
- Mental health support
- Nutritional counseling
- Sports physicals
- Health education programs
- Youth-friendly clinic hours

Respectful, non-patronizing tone. Address teens directly while being informative.`
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { studentsData, groupRanges, topics };
}

