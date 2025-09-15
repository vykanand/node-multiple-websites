-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2017 at 07:57 AM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gq`
--

-- --------------------------------------------------------

--
-- Table structure for table `elv`
--

CREATE TABLE IF NOT EXISTS `elv` (
  `id` int(11) NOT NULL,
  `company` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contact` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `directorname` varchar(255) DEFAULT NULL,
  `directorlinkedin` varchar(255) DEFAULT NULL,
  `apikey` varchar(255) NOT NULL,
  `refid` varchar(255) DEFAULT NULL,
  `addedby` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `appointment` varchar(255) DEFAULT NULL,
  `person` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `elv`
--

INSERT INTO `elv` (`id`, `company`, `created_at`, `contact`, `address`, `description`, `directorname`, `directorlinkedin`, `apikey`, `refid`, `addedby`, `notes`, `appointment`, `person`) VALUES
(59, 'Brij Industries', '2017-04-10 00:14:57', '', 'A-95, Murlipura Scheme, Near V. K. I. Area, Jaipur, Rajasthan 302013', 'Oct 29, 2016 - Brij Industries is a trusted Manufacturer, Exporter and Supplier of a high end collection of Trays, Racks and other products for industriesÂ ...\n', 'Brij Raj\n', 'https://in.linkedin.com/in/brijraajsingh\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mina', 'hi', 'yeah', 'karan'),
(60, 'Buniyad Builders Pvt Ltd', '2017-03-10 00:17:52', '09910000359', 'G Block, Pocket G, Sector 18, Noida, Uttar Pradesh 201301', 'ABOUT COMPANY MANAGEMENT TEAM. video thumb. BUNIYAD is a thorough leader in retail and personal real estate ownership; we provide professionalÂ ...\n', 'Buniyad Real Estate Services\n', 'https://in.linkedin.com/in/buniyaddotcom\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', NULL, NULL, NULL, NULL),
(61, 'S.r.i. Pumps Company', '2017-05-10 00:18:39', '9787899543', 'Postal Address. 89-18-45 ... Email: Email Sri Pumps & Fittings Industrial Corporation ... Sri Pumps Mfg. Co: Sanitary Centrifugal, Self priming, Monoblock Pumps\n', 'S.r.i. Pumps Company - Manufacturer of Centrifugal Pump', 'Madhuri Sri Pumps\n', 'https://in.linkedin.com/in/madhuri-sri-pumps-2b118015\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', NULL, NULL, NULL, NULL),
(62, 'Reycor India Services', '2017-05-10 00:20:28', '01204664032', '2nd Floor, C-38, Sector-2, Noida, Uttar Pradesh 201301', 'Reycor India Services. Incorporated in the year 2004, we, â€œReycor India Servicesâ€, are a prominent organization, which is engaged in manufacturing, supplying and exporting a comprehensive array of quality-assured Industrial Electrical Parts.\n', 'Samarth Agrawal\n', 'https://in.linkedin.com/in/samarth1\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(63, 'Cadence Design Systems India Pvt. Ltd', '2017-05-10 00:25:20', '01203984000', 'Plot 57A, B & C, Noida Special Economic Zone (NSEZ), Phase 2, Noida, Uttar Pradesh 201305', 'Valid Logic Systems was one of the first commercial electronic design automation (EDA) companies, now acquired by Cadence. ... Valid acquired several companies such as Telesis (PCB layout), Analog Design Tools, and Calma (IC layout). In turn, Valid was ac', '32 Cadence Design Systems India Pvt Ltd Jobs\n', 'https://in.linkedin.com/jobs/cadence-design-systems-india-pvt-ltd-jobs\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(64, 'Capital Power Systems Ltd', '2017-05-10 00:28:37', '01204648005', 'Capital Power System LTD in Delhi listed under Electric Meter Manufacturers with Address, Contact Number, Reviews & Ratings, Photos, Maps. Visit Justdial forÂ ...\n', 'Capital Power reports solid first quarter 2017 results. Strategic growth initiatives strengthen 2017 adjusted funds from operations by 12% with recentlyÂ ...', 'Amit Sisodia\n', 'https://in.linkedin.com/in/amit-sisodia-b0751137\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(65, 'Akaaro Consulting and Training', '2017-05-10 00:33:07', '930530900', 'Apr 10, 2017 - Business Consulting Jobs of Our Vision Is To Enable Businesses And ... Developer For Maplegraph by Akaaro Consulting and Training ( 3.9 ... Map & Address ... Job Type - Full timeExperience - < 1 YearQualification - UnderÂ ...\n', 'Two days of Extensive learning for budding Trainers by Akaaro Consulting and Training. Workshop Dates: 19 th to 20 th May, 2017 (Friday and Saturday) Workshop Timing: 9:30 a.m. to 5.30 p.m. (Reporting Time is 9:00 a.m.)\n', 'Meenakshi Ruhela\n', 'https://in.linkedin.com/in/meenakshi-ruhela-2b0490b4\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(70, 'Creative Engineers', '2017-05-10 01:06:42', '32016', 'In currency transactions, hard assets are synonymous with currencies that the public generally ... A hard asset is the opposite of an intangible item such as goodwill or a patent. ... value, a portion of this underlying value is derived from the value of ', 'Nov 3, 2016 - What is essential is that the total value of the collateral, after accounting for the haircuts, is equal to (or above) the total loan amount, whetherÂ ...\n', '11 Examples of Digital Assets - Simplicable\n', 'simplicable.com/new/digital-asset\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(71, 'Mackwell Pumps ', '2017-05-10 01:18:10', '', 'Mackwell Pumps & Controls - Manufacturer of Centrifugal Pump, Polypropylene Pumps & Gear Pumps from Ahmedabad, Gujarat, India.\n', 'Welcome to MACKWELL PUMPS & CONTROLS. Mackwell is an emerging company in the field of pumping technology and systems. The company has its registered office in Ahmadabad (India), which is a highly prosperous city.\n', 'Mack well drilling Pump service\n', 'https://www.linkedin.com/in/mack-well-drilling-pump-service-64463210a?trk=pub...\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(72, 'Conexant Systems Pvt Ltd', '2017-05-10 01:18:48', '04030863000', 'Conexant Systems Pvt Ltd in Madhapur, Hyderabad listed under Computer Software Developers with Address, Contact Number, Reviews & Ratings, Photos,Â ...\n', 'Our mission is to enable a better audio and voice experience on all devices. We combine our significant IP portfolio in DSP, analog and mixed signal technology to deliver silicon and software-based solutions that enhance, enrich and expand the user experi', 'Conexant Systems\n', 'https://www.linkedin.com/in/conexant-systems-73aa9962\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(79, 'Smart Cables and Cords Private Limited\n', '2017-05-10 12:26:16', '01127872886', 'Find complete information on Smart Cables And Cords Private Limited, ... Find out availability of your company, LLP and OPC name right away. ... Registered Office Address, 94 BADL INDUSTRIALSTATE PHASE II BADLI DELHI Delhi INDIA.\n', 'SMART CABLES AND CORDS PVT.LTD manufacturers of â€œSMARTâ€ and â€œDIGNITYâ€ Brand Cables and Cords founded in 1999 by its founder Chairman Sh. Amit Bansal S/O Sh. ... SMART CABLES is an innovative engineering oriented customer focused organization speci', 'SUJATA SHARMA\n', 'https://in.linkedin.com/in/sujata-sharma-a72216103\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(81, 'Phx Industries', '2017-05-10 18:02:57', '9788789000', 'A - 58/2, Okhla Industrial Area, Phase - II, New Delhi - 110 020. India. Tel +91 11 30262 800. Fax +91 11 26383 285. E-mail: works@phoenixcontact.co.inÂ ...\n', 'With Phoenix Industries combination of expertise in the manufacturing of tire recycling plants and asphalt rubber blending technology makes it the only company in the world that can literally â€œtake the waste tire back to the road.â€', 'Phoenix Industries Inc.\n', 'https://www.linkedin.com/company/phoenix-industrial\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(103, 'CMI Limited\n', '2017-05-12 01:52:53', '09958533005', '... Tehsil Nalagarh, Baddi, District Solan â€“ 173205, Himachal Pradesh, Indiaâ€œ and delete this para as well "CMI is an ISO 9001 Company enjoying the goodwill ofÂ ...\n', 'Apr 16, 2015 - GCE with its facility located at Baddi, in Himachal Pradesh, will now become a ... Welcome to CMI Limited an ISO 9001 accredited company,Â ...\n', 'MARSH CMI LIMITED\n', 'https://www.linkedin.com/company/marsh-cmi-limited\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(114, 'Techno Color Corporation\n', '2017-05-12 06:05:10', '02225577033', 'Techno Color Corporation (Unit Of Advent Dyestuffs And Chemicals Pvt. Ltd.), Mumbai - Manufacturer of Acid Dyes and Salt Free Dyes. Techno Color Corporation (Unit Of Advent Dyestuffs And Chemicals Pvt. Ltd.)\n', 'Techno Color Corporation dealing in Acid Dyes in India who are exporting products to Europe, America and Southern Asia. Our acid dyes have established their niche on the platforms of utility and cost effectiveness. The company undertakes stringent quality', 'TECHNOCOLOR LLC.\n', 'https://www.linkedin.com/company/technocolor-llc.\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(116, '1mg', '2017-05-12 06:40:56', '012441666661', '1st Floor, Motorola Building, MG Road,, Sector 14, Gurugram, Haryana 122001', '1mg. 1mg is an e-commerce health care company based in Gurgaon, Haryana, India. The company was founded in 2012 by Prashant Tandon, Gaurav Agarwal and Vikas Chauhan. 1mg operates an online marketplace for medicines, besides facilitating medical appointmen', 'Gaurav Agarwal\n', '', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(121, 'Entura Hydro Tasmania India Pvt Ltd', '2017-05-12 07:04:11', '61362454500', 'Entura Hydro Tasmania India Private Limited company information, Entura ... address on file is D-58 Basement, Kalkaji New Delhi Delhi India 110019, NewÂ ...\n', 'National and international consulting firm which provides expert engineering and environmental services.\n', 'Hydro Tasmania\n', '', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(122, 'Array Mediagraphics', '2017-05-12 07:14:21', '09433017639', '188, Kasba Rd, Ruby Park East, Kasba, Kolkata, West Bengal 700042', 'See who you know at Array Mediagraphics', 'Arnab Ray\n', 'https://in.linkedin.com/in/arnabarray\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(126, 'Nalanda Travels', '2017-05-12 16:44:54', '06122228792', '407, Jagat Trade Centre, Fraser Road, Fraser Road, Patna, Bihar 800001', 'Travel Agents in Nalanda. Get list of Travel Companies offering Best Deals for your Travel requirements. Get Phone Numbers, Address, Latest ReviewsÂ ...\n', 'Nalanda Travels\n', 'https://www.linkedin.com/company/nalanda-travels\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(131, 'Prathamesh Industries', '2017-05-12 17:04:44', '0790412114', 'Get Top Management, MD , CEO , HR Manager Contact details with Email id of Prathamesh Industries in Pune . Address , contact numbers, contact details ofÂ ...\n', '... Special Tooling', 'PRATHAMESH INDUSTRIES - India\n', '', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(132, 'Pratham Education Foundation\n', '2017-05-12 17:11:12', '12220004500', 'Pratham (www.pratham.org) is not connected to Pratham Foundation ... PRATHAM EDUCATION FOUNDATION IS REGISTERED UNDER SECTION 8 \nOF THEÂ ...\n', 'A SOCIETAL MISSION OF GOVERNMENT, BUSINESS AND CIVIL SOCIETY, PRATHAM IS INSPIRING PEOPLE AROUND THE WORLD TO WORK TOWARDS PROVIDING QUALITY EDUCATION FOR CHILDREN AND YOUTH.\n', 'Pratham Education\n', '', 'jjwqP6RKsAsvpDjipATd', 'rwe34', NULL, NULL, NULL, NULL),
(134, 'Aptus Value Housing Finance India Ltd', '2017-05-12 22:34:34', '', 'Housing being the one of the essential needs of mankind, the demand for shelter grows in line with the increase in population and the standard of living.\n', 'Aptus Value Housing Finance India Ltd is a Housing Finance Company. Aptus has been formed to primarily address the housing finance needs of self employed, informal segment of customers belonging to Low and Middle Income Families primarily from semi urban ', 'Prakash Rayen\n', 'https://in.linkedin.com/in/manoharan-chokkath-theyandath-42793668\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(135, 'Royal Paper Industries', '2017-05-12 22:35:38', '08042754051', 'Wholesale Trader of Paper Plate Making Machine , Automatic Machines & CFL Light offered by Royal Manufacturing & Company from New Delhi, Delhi, India.\n', 'ROYAL PAPER INDUSTRIES in New Delhi, Delhi, India - Company Profile. Technological improvements are directly linked to the economic growth, and Indian industrialization scenario supports this fact. ... Knowing the role of technology in industrialization, ', 'Royal Paper Products, Inc.\n', 'https://www.linkedin.com/in/royal-paper-products-5ab90889Similar\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(138, '\nAsirvad Microfinance Ltd', '2017-05-15 01:16:49', '04442124493', 'H1,Community Centre, Near Gurudwara,Block H, Naraina Vihar, New Delhi, Delhi 110028', 'The status of the Company has been converted from private Limited ... We request Asirvad to lend us more and more which will help us progress further inÂ ...\n', 'Gopi Gopinath\n', 'https://www.linkedin.com/company/fusion-microfinanceSimilar\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(139, 'KSB Consultancy', '2017-05-15 04:34:26', '09971477970', '2356 1st Floor, Faridabad, Haryana 121006', 'Placement Services, Manpower Recruitment, Human Resource Consultancy, Career Consultancy & Staffing Solutions. ... Till date, KSB Consultancy has successfully catered to the manpower needs of many esteemed clients across varied industries like - Textiles/', '7 Ksb Consultancy Jobs\n', 'https://in.linkedin.com â€º Jobs â€º Ksb Consultancy Jobs\n', 'jjwqP6RKsAsvpDjipATd', NULL, NULL, NULL, NULL, NULL),
(140, '100yellow.com', '2017-05-18 09:45:07', '9056788869', 'Address: Dep. of Animal Husbandry and Agricultural Chemistry. 3356 ... horsepower and gave a crude oil averaging 20 to 21 red and 100 yellow. ... Illinois Soy Products Co. of Springfield, Illinois, increased its capital from $40,000 to $100,000;Â ...\n', 'Premier online printing service for business cards, corporate calendars, office stationery, promotional products, gift items and other branding collateral. A wide array of promotional products like key chains bearing your logo, coasters with your branding', '21st Century Enviro Engineers Pvt Ltd - India\n', 'https://in.linkedin.com/in/gauravkapoor1Similar\n', 'Q94CrGjmlclUUcftWCDL', 'rwe34', NULL, NULL, NULL, NULL),
(142, 'Aadharshila School', '2017-05-18 10:48:23', '01127316362', 'E-7, Greater Kailash Enclave II, Greater Kailash, New Delhi, Delhi 110048', 'Name of the School with address: Aadharshila School ... Name of Trust/Society/Company Registered under Section 25 of the Company act, 1956. Period up toÂ ...\n', 'Aadharshila School - India\n', 'https://www.linkedin.com/company/aadharshila-public-convent-school---india\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', NULL, NULL, NULL, NULL),
(143, 'ASME India', '2017-05-26 22:42:25', '1210002286', 'Udyog Vihar, Phase III, Sector 19, Gurugram, Haryana', 'ASME India Training', 'ASME LNMIIT\n', 'https://in.linkedin.com/in/natteri1\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', NULL, NULL, NULL, NULL),
(144, 'Argus Cosmetics Ltd Agey', '2017-05-26 22:42:57', '94424996900', 'Argus Cosmetics Limited, jobs at Argus Cosmetics Limited, Argus Cosmetics ... Argus.in. Headquarters Chennai, India Size: 400 Employees Company Type:\n', 'Heroku Do Z. Classics Z. Man Office Z. Man Work Z. Soap Z. Polo Z. Bike Z ... Founded by the shared vision of four brothers, Argus leadership team has been ... Argus is the true embodiment of the saying â€œ Whole is greater than the sum of its partsâ€. .', 'Nishant Gupta\n', 'https://in.linkedin.com/in/mohana-sundaram-9338772a\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh\n', NULL, NULL, NULL),
(145, 'Argus Cosmetics Ltd', '2017-05-26 22:43:51', '04424996902', 'Argus Cosmetics Limited, jobs at Argus Cosmetics Limited, Argus Cosmetics ... Argus.in. Headquarters Chennai, India Size: 400 Employees Company Type:\n', 'Classics Z. Man Office Z. Man Work Z. Soap Z. Polo Z. Bike Z ... Founded by the shared vision of four brothers, Argus leadership team has been ... Argus is the true embodiment of the saying â€œ Whole is greater than the sum of its partsâ€. ....', 'Nishant Gupta\n', 'https://in.linkedin.com/in/mohana-sundaram-9338772a\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh\n', NULL, NULL, NULL),
(150, 'CBL Data Recovery Technologies India Pvt Ltd', '2017-05-27 03:31:10', '20', 'Feb 16, 2017 - Get company details of Cbl Data Recovery Technologies India Private ... INDIA PRIVATE LIMITEDis a Unlisted Private company incorporated on 28 January, 2008. ... Login for email address. ... Complete MCA documents set.\n', 'Professional data recovery lab with 20+ years experience for hard drives crashes, RAID arrays, ... â€œThanks to CBL, we did not have to redo projects from the start or face potential lawsuits from ... Bal Klear â€“ Applied Engineering Solutions Ltd.\n', 'Shaikh Tajuddin\n', 'https://in.linkedin.com/in/kiran-bhagwanani-b6646b9Similar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh\n', NULL, NULL, NULL),
(151, 'CCI Logistics Ltd', '2017-05-27 03:33:26', '01126814943', '202 B, Corporate Center, Andheri Kurla Road, Andheri (E) Mumbai 400059. India. Need to contact this company? Call Click to see their phone number PhoneÂ ...\n', 'CCI Logistics Ltd. ...intime intact. Profile. Our Services. Esteem Clients. Useful Info. Track & Trace. Network. Contact Us. Transportation. Sea Freight. Air Freight.\n', 'CCI Logistics, LLC\n', 'https://in.linkedin.com/in/umakanta-das-59104839\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh\n', NULL, NULL, NULL),
(152, 'BCITS Pvt Ltd', '2017-05-31 03:19:04', '08023414178', '# 86, 3rd Cross, Bhoopasandra Main Road, RMV 2nd Stage, Bengaluru, Karnataka 560094', 'Aug 30, 2016 - About Us. â€œAt BCITS we innovate, create and deliver top class, cost effective and ... West Bengal State Electricity Distribution Company LimitedÂ ...\n', 'Klaus IT Solutions Pvt Ltd\n', 'https://in.linkedin.com/in/bindu-sara-thiru-06971628Similar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh\n', NULL, NULL, NULL),
(153, '\nBCL Secure Premises Pvt Ltd', '2017-05-31 03:23:02', '01246633400', 'Plot no: 14A ,Sector -18, Maruti Industrial Complex, Gurugram, Haryana 122015', 'Our Security Systems offer turnkey solutions for all kinds of electronic security, video ... BCL, helps organizations mitigate risks, maintain business continuity andÂ ...\n', 'Anoop chandola\n', 'https://in.linkedin.com/in/kamal-chand-5b569710\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh\n', NULL, NULL, NULL),
(154, 'BCP Advisors Pvt Ltd', '2017-05-31 03:23:50', '01244683669', 'Find complete information on Bcp Advisors Private Limited, including company details, ... Present Residential Address, FLAT 3B, PLANET X BLOCK B, SREEÂ ...\n', 'BCP Advisors Pvt. Ltd. is a private equity and venture capital firm specializing in growth capital and middle market investments. ... The firm can invest up to $200.\n', 'Rishabh Phagre\n', 'https://in.linkedin.com/in/pratiksethiSimilar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(155, 'Bcube IT Services Pvt Ltd', '2017-05-31 03:27:42', '', '264, Udyog Vihar Phase 1, Sector 20, Gurugram, Haryana 122016', 'Bcube IT Services Pvt Ltd in Udyog Vihar, Delhi - 20 Ratings & Reviews. Call Centres with Address, Contact Number, Photos, Maps. View Bcube IT Services PvtÂ ...\n', 'B Cube it pvt ltd IT\n', 'https://in.linkedin.com/in/ankit-jain-2415546Similar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(156, '\nBCS India Pvt Ltd', '2017-05-31 16:19:35', '01612848597', 'Company information, business information, directors/partners details and ... Bcs India Private Limited. is a Private incorporated on 28 May 2004. ... Its Email address is krishansindwaniandco@gmail.com and its registered address ... Unlock complete repor', 'Full name: BCS India Pvt Ltd. Status: Non-Listed Legal Form: Limited Liability Company ... Source: Accord Fintech Private Limited, EMIS Company Database. ... report for this company will be available to download immediately after purchase.\n', 'BCS INDIA PRIVATE LIMITED\n', 'https://www.linkedin.com/company/bcs-consulting-pvt-ltd\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(157, 'BCH Electric Ltd', '2017-05-31 16:26:04', '18001039262', '20/4, Mathura Road, Faridabad, Haryana 121006', 'BCH Electric Limited, an ISO 9001:2008 Company, is one of todayâ„¢s leading Switchgear manufacturers & LV Panels Manufacturers of low voltage electrical and electronic controls in India. The Company was established in 1965 as a joint venture between Cutle', 'BCH Electric Ltd\n', 'https://in.linkedin.com/in/bch-electric-ltd-anjaneyulu-vemula-402b5b6a\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(158, 'BEDA Flow Systems Pvt Ltd', '2017-06-01 14:16:49', '01204329990', 'Oct 5, 2016 - Get company details of Beda Flow Systems Private Limited ... The company has 5 directors/Key management personnel. ... EMAIL ADDRESS.\n', 'BEDA Flow supplies technically advanced products of the companies VSE ... In addition to the well-established gear and radial piston pumps Beinlich will soonÂ ...\n', 'Bedaflow Systems Pvt. Ltd.\n', 'https://in.linkedin.com/in/munendra-kumar-2a747729\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(159, 'Bee Management Consultancy Pvt Ltd', '2017-05-31 16:37:25', '02222670842', '2nd floor, Kalpataru Heritage, 127, Mahatma Gandhi Road, Mumbai, Maharashtra 400001', 'WHAT WE DO ... â€¢Consultancy & Business Development Services in dealing with the Indian Market Place for you. CLIENT EXPERIENCES. â€œRajiv Bhatia the Director of Bee Management is a very pragmatic management practitioner who hasÂ ...\n', '3 Bee Management Consultancy Pvt Ltd Jobs\n', 'https://in.linkedin.com/jobs/bee-management-consultancy-pvt.-ltd-jobs?trk=guest...\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(160, 'Beehive Systems Pvt Ltd', '2017-05-31 16:38:29', '01204308888', 'B 37, Ground Floor, Sector, 1, Noida Road, Noida, Uttar Pradesh 201301', 'We shall continue to strive and make Beehive Systems an employee friendly and .... One of the best pro about the company is you will feel like a family here.\n', 'Beehive Systems\n', 'https://in.linkedin.com/in/tushar-kothari-a62a48\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(161, 'Allied Herbals Ltd.', '2017-06-01 07:24:16', '0012016899566911149610000', 'C-33, Sector 59, Noida, Uttar Pradesh 201301', 'Allied Herbals reports standalone nil net profit/loss in the December 2016 quarter ... Allied Herbals reports standalone net loss of Rs 0.01 crore in the SeptemberÂ ...\n', 'Herbal Allies\n', 'economictimes.indiatimes.com â€º Markets â€º Stocks â€º Stock Price QuotesCached\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(162, 'Aadi Industries Ltd.', '2017-06-01 07:24:48', '', 'A-105-106, Narmada Marg, D Block, Sector 12, Noida, Uttar Pradesh 201301', '"AADI INDUSTRIES LTD with its head office at Mumbai has never looked back since its inception. We have an extensive experience in the manufactureâ€¦\n', 'AARTI INDUSTRIES LTD. , INDIA\n', 'https://in.linkedin.com/in/parul-shah-a515412a\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(163, 'Ajanta Pharma', '2017-06-01 07:25:17', '', 'Ajanta Pharma Limited (APL) (BSE: 532331 | NSE: AJANTPHARM) is an Indian multinational, engaged in development, manufacturing and marketing ofÂ ...\n', 'Ajanta Pharma is a specialty pharmaceutical company engaged in ... Research and Development as a vital component of Business Strategy that will provide usÂ ...\n', 'HR at Ajanta Pharma Limited\n', 'https://in.linkedin.com/in/arvind-agrawal-9486364Similar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(164, 'S Crane Engineering Works', '2017-06-01 13:25:54', '02228955361', 'Manufacturing and exporting material handling equipment, industrial material handling equipment, heavy material handling equipment from S CraneÂ ...\n', 'S. Cranes is leading company in Cranes Manufacturing, Servicing & Repairing with EOT, HOT, Single-Double Girder Slung Cranes, Wire ropes, Goods cumÂ ...\n', 'Paressh Joshi S.Crane\n', 'https://www.linkedin.com/company/s-crane-hire\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(165, 'Bcube Solutions', '2017-06-01 14:04:36', '02613994452', 'This 15-hour program provides you complete tips and techniques for setting up ... of participants including employees in companies (IT / BPO / Manufacturing,Â ...\n', 'Bcube Solutions is mobile development and web development center. ... We can help you. ... Bcube Solutions is an established web development company delivering web development and web design ... Where did you hear about us?\n', 'BCube Global Solutions\n', 'https://www.linkedin.com/company/bcube-groupSimilar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(169, 'Collective Media Softek (india) Pvt Ltd', '2017-06-02 02:49:56', '08043343000', 'Feb 7, 2017 - Company information, business information, directors/partners details and ... Collective (india) Private Limited is a Private incorporated on 04 February 2005. ... Its Email address is jaisimha@collective.com and its registered address is No', 'Collective empowers enterprises with technology and expertise to unify digital ... Full-service programmatic media solutions for agencies and advertisers,Â ...\n', 'Liju John\n', 'https://www.linkedin.com/company/tumriSimilar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(171, 'Coirfoam India Pvt Ltd', '2017-06-02 02:13:06', '01294090599', 'No. 14/6, Mathura Road, Faridabad, Haryana 121003', 'Started in the year 1977 Coirfoam (India) Private Limited launched the brand ... mattresses for the Indian consumer, becoming the 1st company in India to do so.\n', 'Naresh Loomba\n', 'https://www.linkedin.com â€º ... â€º C - câ€†cuâ€†d â€º Coinis Ltd - Colby International LLCCached\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(172, 'Cognet HR Solutions Pvt Ltd', '2017-06-02 02:49:07', '04449012970', 'Cognet HR Solutions Pvt Ltd in Ambattur Industrial Estate, Chennai - 31 Ratings & Reviews. Bpo with Address, Contact Number, Photos, Maps. View Cognet HRÂ ...\n', 'CogNet provides Back office support to HR Service Providers in the areas of ... Simply put "CogNet" will save you money and increase your â€œhigh valueâ€ ... Whether you are a payroll bureau or a one-stop shop we have a solution for you.\n', 'Cogent HR Services Pvt Ltd\n', 'https://in.linkedin.com/in/lilli-satheesh-05b93714\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(173, 'Employee Performance\n', '2017-06-05 03:54:27', '', 'Dec 14, 2016 - Employee performance metrics indiate how well employees perform. ... In most companies, performance is assessed several times a year .... Check for a full overview of call center employee performance metrics this blog.\n', 'Many companies use employee performance evaluations as a snapshot of the ... opportunities will present themselves during the performance evaluationÂ ...\n', 'Employee Performance\n', 'https://www.linkedin.com/company/talent-snapshotSimilar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(174, 'Sela Technology Solutions', '2017-06-05 05:53:41', '02066841777', 'Dec 22, 2016 - Sela is Most employee friendly company with very supportive and active ... I worked at Sela Technology Solutions full-time (More than 3 years).\n', 'Sela India is a part of Sela Group, a 30 year old IT company that provides software development, outsourcing solutions, consulting and training services. Sela isÂ ...\n', 'Sela Technology India\n', 'https://in.linkedin.com/in/anuradha-d-7589289\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(175, 'Galaxis Consulting', '2017-06-05 05:55:02', '09899778388', 'Galaxy India Consultants, New Delhi, India. ... COMPLETE FREE OF CHARGE. ..... Urgent Hiring for Hr Executive/Hr Recruiter with the Consultancy Firm ... big airlines including one brand new airline, call on phone number given on our coverÂ ...\n', 'Have Galaxy Consulting make that happen for you! Your employees will better serve your customers, build more innovative products, and sell more when\n', 'Galaxy Consulting\n', 'https://www.linkedin.com/company/galaxy-india-consultantsSimilar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(176, 'Kapp Software Private Limited', '2017-06-05 06:32:31', '', 'Apr 3, 2017 - I worked at Kapp Software full-time (More than 3 years). Pros. You can ... For beginners, this company will provide a good technical knowledge.\n', 'Kapp Software Private Limited is a leading software company in India, offering online software solution, webdevelopment, content management and backofficeÂ ...\n', 'Kapp software private limited\n', 'https://www.linkedin.com/company/kapp-software-pvt.-ltd.\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(177, 'FS Recruitment', '2017-06-08 03:28:08', '110092', 'Neelkanth Tower , East of kailash , delhi, New Delhi, Delhi 110034', 'FS Recruitment is a dedicated recruitment firm established in 2008 working within the Financial Services across the UK. We are a small but growing organisationÂ ...\n', 'FS RECRUITMENT LTD\n', 'https://www.linkedin.com/company/fs-recruitment\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(178, 'Presales Consultant', '2017-06-09 05:38:56', '17201738', 'Average salaries for Tata Consultancy Services Pre Sales Consultant: â‚¹8 ... Email address ... Like work from home, fixed amount of leaves with full pay and etc.â€ ... Consultant Jobs or see Pre Sales Consultant Salaries at other companies.\n', 'Duties of the Pre Sales Consultant. Working closely with the sales team on proposals and pitches for business. Attending meetings with business development managers and acting as a technical expert. ... Presenting proposals to customers alongside members ', '1,700+ Presales Jobs\n', 'https://www.linkedin.com/jobs/presales-consultant-jobsSimilar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(179, 'Idream Digitalabs', '2017-06-09 05:41:03', '01204100408', 'C-65, 3rd Floor, Sector 2, Noida, Uttar Pradesh 201301', 'Mar 19, 2014 - 1 idream Consulting reviews. A free inside look at company reviews and salaries posted anonymously by employees.\n', '3 Idream Digitalabs Pvt Ltd. Jobs\n', 'www.linkedin.com/pulse/posts/rabiah-bhatia-0190905bCached\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', NULL, NULL, NULL),
(180, 'BC Instruments India Pvt Ltd', '2017-06-09 14:07:07', '02692233560', 'Get Top Management, MD , CEO , HR Manager Contact details with Email id of BC Instruments India Pvt Ltd in Vithal Udyognagar . Address , contact numbersÂ ...\n', 'Our mission at B.C. Instruments India is to create productive and lasting relationships based on mutual trust and respect among ourselves, our customers,Â ...\n', 'B.C. Instruments\n', 'https://in.linkedin.com/in/jitendra-prajapati-b2913519\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', 'q3q', 'tte', 'ew'),
(181, 'XO Footwear Private Limited', '2017-06-09 14:08:53', '01127011792', 'A/122, Mangolpuri Industrial Area Phase II, Delhi, 110034', 'XO Footwear is a shoe manufacturing company operating in six, high-capacity factories through out India. For more than a decade we have been committed toÂ ...\n', 'Nitin Gupta\n', 'https://in.linkedin.com/in/nitin-gupta-b4850941Similar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', 'sdgg', 'fwe', 'dsfd'),
(182, 'sythr', '2017-06-11 17:15:41', '43453555', '50, N.W.A., Club Road, Punjabi Bagh Extn, New Delhi, Delhi 110026', 'sdfewer', 'G.S Bawa\n', 'https://www.linkedin.com/in/raj-bawa-71a7b9Similar\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', '21e', 'fwq', 'fsa'),
(183, 'Baxter India', '2017-06-11 17:21:15', '384732992918', '2nd Floor, Tower-C, Building No.8, DLF Cyber City, DLF Phase-II, Gurugram, Haryana 122002', 'ahis iash aosfi', 'Baxter India\n', 'https://in.linkedin.com/in/henry-rodrigues-124a881\n', 'jjwqP6RKsAsvpDjipATd', 'rwe34', 'mona singh', 'sdf', 'rett', 'thi5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `subscription_status` varchar(255) NOT NULL,
  `subscription_remaining` varchar(255) NOT NULL,
  `subscription_till` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `loginstatus` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `refid` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `plan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `apikey`, `role`, `subscription_status`, `subscription_remaining`, `subscription_till`, `loginstatus`, `firstname`, `lastname`, `refid`, `created_at`, `updated_at`, `plan`) VALUES
(1, 'vykanand', '4af5cab77c62eaec5f87b570f2d2b127', 'vykanand@gmail.com', '8959285336', 'Pdjb9JD5SsBLQnMUoWhL', 'admin', 'active', '21', '2017-08-24 02:29:19', 'true', 'vikas', 'anand', 'rwe34', '2017-05-10 18:39:32', '2017-06-02 02:29:19', 'Month UL'),
(2, 'mona', '4af5cab77c62eaec5f87b570f2d2b127', 'mona@gmail.com', '9183928812', 'jjwqP6RKsAsvpDjipATd', 'user', '', '', '0000-00-00 00:00:00', 'false', 'mona', 'singh', 'rwe34', '2017-05-10 18:47:19', '0000-00-00 00:00:00', NULL),
(3, 'jutweet', '363b122c528f54df4a0446b6bab05515', 'j@j.com', '9201929302', 'Q94CrGjmlclUUcftWCDL', 'user', '', '', '0000-00-00 00:00:00', 'false', 'juhi', 'singh', 'rwe34', '2017-05-31 05:40:09', '0000-00-00 00:00:00', NULL),
(5, 'nyk', '7b8b965ad4bca0e41ab51de7b31363a1', 'n@n.com', '9788675659', '9HevhFkSTUIouyCU09KL', 'admin', 'active', '7', '0000-00-00 00:00:00', 'true', 'nikhil', 'verma', 'WPlMe96', '2017-06-05 16:39:02', '0000-00-00 00:00:00', 'trial'),
(8, 'v', '9e3669d19b675bd57058fd4664205d2a', 'vm@v.co', '9755478957', '5E9BSidbP4QRCiuJvP9n', 'admin', '', '7', '0000-00-00 00:00:00', 'false', 'vinay', 'mathur', 'a0gURFP', '2017-06-05 17:16:36', '0000-00-00 00:00:00', 'trial'),
(10, 'mike', '18126e7bd3f84b3f3e4df094def5b7de', 'mk34@gmail.com', '9343254323', 'ZwXcjcYCjBX8tPaALshi', 'admin', '', '6', '2017-06-13 02:06:51', 'true', 'mike', 'tyson', 'DAx85PE', '2017-06-06 02:06:51', '2017-06-06 02:06:51', 'trial'),
(11, 'olay', 'd38afb7fd46c8cc534c47990044d937a', 'gis@g', '2123', 'Zky89ny6KbE5YBOFyZvW', 'user', '', '', '0000-00-00 00:00:00', 'false', 'olay', 'steve', 'DAx85PE', '2017-06-06 02:40:45', '0000-00-00 00:00:00', NULL),
(12, 'ask', '5ed33f7008771c9d49e3716aeaeca581', 'as@gl.c', '9210203021', 'ePD7B0tVd391GI3U6c0y', 'user', '', '', '0000-00-00 00:00:00', 'false', 'asahi', 'glas', 'DAx85PE', '2017-06-06 02:51:25', '0000-00-00 00:00:00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `elv`
--
ALTER TABLE `elv`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `elv`
--
ALTER TABLE `elv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=184;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
