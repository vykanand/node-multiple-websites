-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2017 at 01:00 AM
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
  `apikey` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `elv`
--

INSERT INTO `elv` (`id`, `company`, `created_at`, `contact`, `address`, `description`, `directorname`, `directorlinkedin`, `apikey`) VALUES
(59, 'Brij Industries', '2017-05-10 00:14:57', '', 'A-95, Murlipura Scheme, Near V. K. I. Area, Jaipur, Rajasthan 302013', 'Oct 29, 2016 - Brij Industries is a trusted Manufacturer, Exporter and Supplier of a high end collection of Trays, Racks and other products for industriesÂ ...\n', 'Brij Raj\n', 'https://in.linkedin.com/in/brijraajsingh\n', 'jjwqP6RKsAsvpDjipATd'),
(60, 'Buniyad Builders Pvt Ltd', '2017-05-10 00:17:52', '09910000359', 'G Block, Pocket G, Sector 18, Noida, Uttar Pradesh 201301', 'ABOUT COMPANY MANAGEMENT TEAM. video thumb. BUNIYAD is a thorough leader in retail and personal real estate ownership; we provide professionalÂ ...\n', 'Buniyad Real Estate Services\n', 'https://in.linkedin.com/in/buniyaddotcom\n', 'jjwqP6RKsAsvpDjipATd'),
(61, 'S.r.i. Pumps Company', '2017-05-10 00:18:39', '', 'Postal Address. 89-18-45 ... Email: Email Sri Pumps & Fittings Industrial Corporation ... Sri Pumps Mfg. Co: Sanitary Centrifugal, Self priming, Monoblock Pumps\n', 'S.r.i. Pumps Company - Manufacturer of Centrifugal Pump & Submersible Pump from Coimbatore. We are engaged in manufacturing and supplying a Centrifugal Pump, Submersible Pump, Immersion Centrifugal Pump, Submerged Centrifugal Pump and many more.\n', 'Madhuri Sri Pumps\n', 'https://in.linkedin.com/in/madhuri-sri-pumps-2b118015\n', 'jjwqP6RKsAsvpDjipATd'),
(62, 'Reycor India Services', '2017-05-10 00:20:28', '01204664032', '2nd Floor, C-38, Sector-2, Noida, Uttar Pradesh 201301', 'Reycor India Services. Incorporated in the year 2004, we, â€œReycor India Servicesâ€, are a prominent organization, which is engaged in manufacturing, supplying and exporting a comprehensive array of quality-assured Industrial Electrical Parts.\n', 'Samarth Agrawal\n', 'https://in.linkedin.com/in/samarth1\n', 'jjwqP6RKsAsvpDjipATd'),
(63, 'Cadence Design Systems India Pvt. Ltd', '2017-05-10 00:25:20', '01203984000', 'Plot 57A, B & C, Noida Special Economic Zone (NSEZ), Phase 2, Noida, Uttar Pradesh 201305', 'Valid Logic Systems was one of the first commercial electronic design automation (EDA) companies, now acquired by Cadence. ... Valid acquired several companies such as Telesis (PCB layout), Analog Design Tools, and Calma (IC layout). In turn, Valid was ac', '32 Cadence Design Systems India Pvt Ltd Jobs\n', 'https://in.linkedin.com/jobs/cadence-design-systems-india-pvt-ltd-jobs\n', 'jjwqP6RKsAsvpDjipATd'),
(64, 'Capital Power Systems Ltd', '2017-05-10 00:28:37', '01204648000', 'Capital Power System LTD in Delhi listed under Electric Meter Manufacturers with Address, Contact Number, Reviews & Ratings, Photos, Maps. Visit Justdial forÂ ...\n', 'Capital Power reports solid first quarter 2017 results. Strategic growth initiatives strengthen 2017 adjusted funds from operations by 12% with recentlyÂ ...\n', 'Amit Sisodia\n', 'https://in.linkedin.com/in/amit-sisodia-b0751137\n', 'jjwqP6RKsAsvpDjipATd'),
(65, 'Akaaro Consulting and Training', '2017-05-10 00:33:07', '930530900', 'Apr 10, 2017 - Business Consulting Jobs of Our Vision Is To Enable Businesses And ... Developer For Maplegraph by Akaaro Consulting and Training ( 3.9 ... Map & Address ... Job Type - Full timeExperience - < 1 YearQualification - UnderÂ ...\n', 'Two days of Extensive learning for budding Trainers by Akaaro Consulting and Training. Workshop Dates: 19 th to 20 th May, 2017 (Friday and Saturday) Workshop Timing: 9:30 a.m. to 5.30 p.m. (Reporting Time is 9:00 a.m.)\n', 'Meenakshi Ruhela\n', 'https://in.linkedin.com/in/meenakshi-ruhela-2b0490b4\n', 'jjwqP6RKsAsvpDjipATd'),
(70, 'Creative Engineers', '2017-05-10 01:06:42', '32016', 'In currency transactions, hard assets are synonymous with currencies that the public generally ... A hard asset is the opposite of an intangible item such as goodwill or a patent. ... value, a portion of this underlying value is derived from the value of ', 'Nov 3, 2016 - What is essential is that the total value of the collateral, after accounting for the haircuts, is equal to (or above) the total loan amount, whetherÂ ...\n', '11 Examples of Digital Assets - Simplicable\n', 'simplicable.com/new/digital-asset\n', 'jjwqP6RKsAsvpDjipATd'),
(71, 'Mackwell Pumps ', '2017-05-10 01:18:10', '', 'Mackwell Pumps & Controls - Manufacturer of Centrifugal Pump, Polypropylene Pumps & Gear Pumps from Ahmedabad, Gujarat, India.\n', 'Welcome to MACKWELL PUMPS & CONTROLS. Mackwell is an emerging company in the field of pumping technology and systems. The company has its registered office in Ahmadabad (India), which is a highly prosperous city.\n', 'Mack well drilling Pump service\n', 'https://www.linkedin.com/in/mack-well-drilling-pump-service-64463210a?trk=pub...\n', 'jjwqP6RKsAsvpDjipATd'),
(72, 'Conexant Systems Pvt Ltd', '2017-05-10 01:18:48', '04030863000', 'Conexant Systems Pvt Ltd in Madhapur, Hyderabad listed under Computer Software Developers with Address, Contact Number, Reviews & Ratings, Photos,Â ...\n', 'Our mission is to enable a better audio and voice experience on all devices. We combine our significant IP portfolio in DSP, analog and mixed signal technology to deliver silicon and software-based solutions that enhance, enrich and expand the user experi', 'Conexant Systems\n', 'https://www.linkedin.com/in/conexant-systems-73aa9962\n', 'jjwqP6RKsAsvpDjipATd'),
(79, 'Smart Cables and Cords Private Limited\n', '2017-05-10 12:26:16', '01127872886', 'Find complete information on Smart Cables And Cords Private Limited, ... Find out availability of your company, LLP and OPC name right away. ... Registered Office Address, 94 BADL INDUSTRIALSTATE PHASE II BADLI DELHI Delhi INDIA.\n', 'SMART CABLES AND CORDS PVT.LTD manufacturers of â€œSMARTâ€ and â€œDIGNITYâ€ Brand Cables and Cords founded in 1999 by its founder Chairman Sh. Amit Bansal S/O Sh. ... SMART CABLES is an innovative engineering oriented customer focused organization speci', 'SUJATA SHARMA\n', 'https://in.linkedin.com/in/sujata-sharma-a72216103\n', 'jjwqP6RKsAsvpDjipATd'),
(81, 'Phoniex Industries\n', '2017-05-10 18:02:57', '', 'A - 58/2, Okhla Industrial Area, Phase - II, New Delhi - 110 020. India. Tel +91 11 30262 800. Fax +91 11 26383 285. E-mail: works@phoenixcontact.co.inÂ ...\n', 'With Phoenix Industries combination of expertise in the manufacturing of tire recycling plants and asphalt rubber blending technology makes it the only company in the world that can literally â€œtake the waste tire back to the road.â€\n', 'Phoenix Industries Inc.\n', 'https://www.linkedin.com/company/phoenix-industrial\n', 'jjwqP6RKsAsvpDjipATd'),
(103, 'CMI Limited\n', '2017-05-12 01:52:53', '09958533005', '... Tehsil Nalagarh, Baddi, District Solan â€“ 173205, Himachal Pradesh, Indiaâ€œ and delete this para as well "CMI is an ISO 9001 Company enjoying the goodwill ofÂ ...\n', 'Apr 16, 2015 - GCE with its facility located at Baddi, in Himachal Pradesh, will now become a ... Welcome to CMI Limited an ISO 9001 accredited company,Â ...\n', 'MARSH CMI LIMITED\n', 'https://www.linkedin.com/company/marsh-cmi-limited\n', 'jjwqP6RKsAsvpDjipATd'),
(114, 'Techno Color Corporation\n', '2017-05-12 06:05:10', '02225577033', 'Techno Color Corporation (Unit Of Advent Dyestuffs And Chemicals Pvt. Ltd.), Mumbai - Manufacturer of Acid Dyes and Salt Free Dyes. Techno Color Corporation (Unit Of Advent Dyestuffs And Chemicals Pvt. Ltd.)\n', 'Techno Color Corporation dealing in Acid Dyes in India who are exporting products to Europe, America and Southern Asia. Our acid dyes have established their niche on the platforms of utility and cost effectiveness. The company undertakes stringent quality', 'TECHNOCOLOR LLC.\n', 'https://www.linkedin.com/company/technocolor-llc.\n', 'jjwqP6RKsAsvpDjipATd'),
(116, '1mg', '2017-05-12 06:40:56', '012441666661', '1st Floor, Motorola Building, MG Road,, Sector 14, Gurugram, Haryana 122001', '1mg. 1mg is an e-commerce health care company based in Gurgaon, Haryana, India. The company was founded in 2012 by Prashant Tandon, Gaurav Agarwal and Vikas Chauhan. 1mg operates an online marketplace for medicines, besides facilitating medical appointmen', 'Gaurav Agarwal\n', '', 'jjwqP6RKsAsvpDjipATd'),
(121, 'Entura Hydro Tasmania India Pvt Ltd', '2017-05-12 07:04:11', '61362454500', 'Entura Hydro Tasmania India Private Limited company information, Entura ... address on file is D-58 Basement, Kalkaji New Delhi Delhi India 110019, NewÂ ...\n', 'National and international consulting firm which provides expert engineering and environmental services.\n', 'Hydro Tasmania\n', '', 'jjwqP6RKsAsvpDjipATd'),
(122, 'Array Mediagraphics ', '2017-05-12 07:14:21', '09433017635', '188, Kasba Rd, Ruby Park East, Kasba, Kolkata, West Bengal 700042', 'See who you know at Array Mediagraphics & Systems, leverage your ... clients reach out to a larger global audience and achieve exponential business growth.\n', 'Arnab Ray\n', 'https://in.linkedin.com/in/arnabarray\n', 'jjwqP6RKsAsvpDjipATd'),
(126, 'Nalanda Travels', '2017-05-12 16:44:54', '06122228792', '407, Jagat Trade Centre, Fraser Road, Fraser Road, Patna, Bihar 800001', 'Travel Agents in Nalanda. Get list of Travel Companies offering Best Deals for your Travel requirements. Get Phone Numbers, Address, Latest ReviewsÂ ...\n', 'Nalanda Travels\n', 'https://www.linkedin.com/company/nalanda-travels\n', 'jjwqP6RKsAsvpDjipATd'),
(131, 'Prathamesh Industries', '2017-05-12 17:04:44', '790412114', 'Get Top Management, MD , CEO , HR Manager Contact details with Email id of Prathamesh Industries in Pune . Address , contact numbers, contact details ofÂ ...\n', '... Special Tooling & Ring Gauges offered by Prathamesh Industries from Pune, \nMaharashtra, ... Nature of BusinessManufacturer; Year of Establishment2006.\n', 'PRATHAMESH INDUSTRIES - India\n', '', 'jjwqP6RKsAsvpDjipATd'),
(132, 'Pratham Education Foundation\n', '2017-05-12 17:11:12', '12220004500', 'Pratham (www.pratham.org) is not connected to Pratham Foundation ... PRATHAM EDUCATION FOUNDATION IS REGISTERED UNDER SECTION 8 \nOF THEÂ ...\n', 'A SOCIETAL MISSION OF GOVERNMENT, BUSINESS AND CIVIL SOCIETY, PRATHAM IS INSPIRING PEOPLE AROUND THE WORLD TO WORK TOWARDS PROVIDING QUALITY EDUCATION FOR CHILDREN AND YOUTH.\n', 'Pratham Education\n', '', 'jjwqP6RKsAsvpDjipATd'),
(133, 'MEGA CINEMAS PRIVATE LIMITED', '2017-05-12 17:13:53', '62017062016749992016045942', 'Find out the details about 1 Mega Cinemas Private Limited and its directors including ... You can reach the company at their Registered Address Door No.3/559Â ...\n', 'Feb 6, 2017 - Mega Cinemas Private Limited is a Private incorporated on 06 June 2016. It is classified as Non-govt company and is registered at Registrar ofÂ ...\n', 'Wow Retail Pvt.Ltd\n', 'https://www.linkedin.com/company/spi-cinemas-private-limitedSimilar\n', 'jjwqP6RKsAsvpDjipATd'),
(134, 'Aptus Value Housing Finance India Ltd', '2017-05-12 22:34:34', '', 'Housing being the one of the essential needs of mankind, the demand for shelter grows in line with the increase in population and the standard of living.\n', 'Aptus Value Housing Finance India Ltd is a Housing Finance Company. Aptus has been formed to primarily address the housing finance needs of self employed, informal segment of customers belonging to Low and Middle Income Families primarily from semi urban ', 'Prakash Rayen\n', 'https://in.linkedin.com/in/manoharan-chokkath-theyandath-42793668\n', 'jjwqP6RKsAsvpDjipATd'),
(135, 'Royal Paper Industries', '2017-05-12 22:35:38', '08042754051', 'Wholesale Trader of Paper Plate Making Machine , Automatic Machines & CFL Light offered by Royal Manufacturing & Company from New Delhi, Delhi, India.\n', 'ROYAL PAPER INDUSTRIES in New Delhi, Delhi, India - Company Profile. Technological improvements are directly linked to the economic growth, and Indian industrialization scenario supports this fact. ... Knowing the role of technology in industrialization, ', 'Royal Paper Products, Inc.\n', 'https://www.linkedin.com/in/royal-paper-products-5ab90889Similar\n', 'jjwqP6RKsAsvpDjipATd'),
(138, '\nAsirvad Microfinance Ltd', '2017-05-15 01:16:49', '04442124493', 'H1,Community Centre, Near Gurudwara,Block H, Naraina Vihar, New Delhi, Delhi 110028', 'The status of the Company has been converted from private Limited ... We request Asirvad to lend us more and more which will help us progress further inÂ ...\n', 'Gopi Gopinath\n', 'https://www.linkedin.com/company/fusion-microfinanceSimilar\n', 'jjwqP6RKsAsvpDjipATd'),
(139, 'KSB Consultancy', '2017-05-15 04:34:26', '09971477970', '2356 1st Floor, Faridabad, Haryana 121006', 'Placement Services, Manpower Recruitment, Human Resource Consultancy, Career Consultancy & Staffing Solutions. ... Till date, KSB Consultancy has successfully catered to the manpower needs of many esteemed clients across varied industries like - Textiles/', '7 Ksb Consultancy Jobs\n', 'https://in.linkedin.com â€º Jobs â€º Ksb Consultancy Jobs\n', 'jjwqP6RKsAsvpDjipATd'),
(140, '100yellow.com', '2017-05-18 09:45:07', '100', 'Address: Dep. of Animal Husbandry and Agricultural Chemistry. 3356 ... horsepower and gave a crude oil averaging 20 to 21 red and 100 yellow. ... Illinois Soy Products Co. of Springfield, Illinois, increased its capital from $40,000 to $100,000;Â ...\n', 'Premier online printing service for business cards, corporate calendars, office stationery, promotional products, gift items and other branding collateral. A wide array of promotional products like key chains bearing your logo, coasters with your branding', '21st Century Enviro Engineers Pvt Ltd - India\n', 'https://in.linkedin.com/in/gauravkapoor1Similar\n', 'jjwqP6RKsAsvpDjipATd'),
(142, 'Aadharshila School', '2017-05-18 10:48:23', '01127316362', 'E-7, Greater Kailash Enclave II, Greater Kailash, New Delhi, Delhi 110048', 'Name of the School with address: Aadharshila School ... Name of Trust/Society/Company Registered under Section 25 of the Company act, 1956. Period up toÂ ...\n', 'Aadharshila School - India\n', 'https://www.linkedin.com/company/aadharshila-public-convent-school---india\n', 'jjwqP6RKsAsvpDjipATd'),
(143, '\nASME India', '2017-05-26 22:42:25', '12100022861051096032861051096039', 'Udyog Vihar, Phase III, Sector 19, Gurugram, Haryana', 'ASME India Training & Development offers you: Comprehensive course offerings in multiple learning formats (public, in-company, distance); ProfessionalÂ ...\n', 'ASME LNMIIT\n', 'https://in.linkedin.com/in/natteri1\n', 'jjwqP6RKsAsvpDjipATd'),
(144, 'Argus Cosmetics Ltd', '2017-05-26 22:42:57', '04424996902', 'Argus Cosmetics Limited, jobs at Argus Cosmetics Limited, Argus Cosmetics ... Argus.in. Headquarters Chennai, India Size: 400 Employees Company Type:\n', 'Man Do Z. Classics Z. Man Office Z. Man Work Z. Soap Z. Polo Z. Bike Z ... Founded by the shared vision of four brothers, Argus leadership team has been ... Argus is the true embodiment of the saying â€œ Whole is greater than the sum of its partsâ€. ....', 'Nishant Gupta\n', 'https://in.linkedin.com/in/mohana-sundaram-9338772a\n', 'jjwqP6RKsAsvpDjipATd'),
(145, 'Argus Cosmetics Ltd', '2017-05-26 22:43:51', '04424996902', 'Argus Cosmetics Limited, jobs at Argus Cosmetics Limited, Argus Cosmetics ... Argus.in. Headquarters Chennai, India Size: 400 Employees Company Type:\n', 'Man Do Z. Classics Z. Man Office Z. Man Work Z. Soap Z. Polo Z. Bike Z ... Founded by the shared vision of four brothers, Argus leadership team has been ... Argus is the true embodiment of the saying â€œ Whole is greater than the sum of its partsâ€. ....', 'Nishant Gupta\n', 'https://in.linkedin.com/in/mohana-sundaram-9338772a\n', 'jjwqP6RKsAsvpDjipATd');

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
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `apikey`, `role`, `subscription_status`, `subscription_remaining`, `subscription_till`, `loginstatus`, `firstname`, `lastname`, `refid`, `created_at`, `updated_at`) VALUES
(1, 'vykanand', '4af5cab77c62eaec5f87b570f2d2b127', 'vykanand@gmail.com', '8959285336', 'Pdjb9JD5SsBLQnMUoWhL', 'admin', '', '', '0000-00-00 00:00:00', 'false', 'vikas', 'anand', 'rwe34', '2017-05-10 18:39:32', '0000-00-00 00:00:00'),
(2, 'mona', '4af5cab77c62eaec5f87b570f2d2b127', 'mona@gmail.com', '9183928812', 'jjwqP6RKsAsvpDjipATd', 'user', '', '', '0000-00-00 00:00:00', 'true', 'mona', 'singh', 'rwe34', '2017-05-10 18:47:19', '0000-00-00 00:00:00');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=146;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
