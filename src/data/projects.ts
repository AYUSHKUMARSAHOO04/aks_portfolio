import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: "ga4-ecommerce-pipeline",
    number: "01",
    title: "GA4 E-COMMERCE PRODUCT ANALYTICS PIPELINE",
    category: "PRODUCT ANALYTICS",
    year: "2026",
    featured: true,
    tagline: "4.3M+ GA4 events analyzed through a 26-metric framework and 23-point data validation suite.",
    shortDescription: "Built an end-to-end product analytics pipeline on 4.3M+ GA4 events, using a 26-metric framework, 54 production SQL queries, and a structured data-validation layer to analyze funnel performance, retention, revenue, and customer behavior.",
    tools: ["GoogleSQL", "Google BigQuery", "GA4", "SQL Data QA", "Git/GitHub"],
    
    problem: {
      statement: "High-volume GA4 event data can produce misleading product and revenue metrics when event grain, nested fields, transaction identifiers, and product mappings are not validated before analysis. The analysis was designed to identify where users were lost across the customer journey, evaluate acquisition and retention quality, understand revenue and customer-value concentration, and translate validated findings into actionable Product and Growth recommendations.",
      context: "Derived sessionization, user identification (user_pseudo_id), and product mappings from 4,295,584 raw GA4 event exports across a 92-day observation window (Nov 1, 2020 to Jan 31, 2021).",
      businessImpact: "Data validation identified material measurement and modeling issues that required explicit handling before funnel, revenue, retention, and product metrics could be trusted."
    },
    data: {
      sources: [
        "Google Analytics 4 BigQuery Public Sample Dataset (Google Merchandise Store)",
        "Raw GA4 Export (events_*) spanning 92 days (Nov 1, 2020 - Jan 31, 2021)",
        "Identity: user_pseudo_id; Session grain: user_pseudo_id + ga_session_id"
      ],
      volume: "4,295,584 events across 270,154 users and 360,129 sessions",
      dimensions: ["Event Name", "Item Category / item_name", "Traffic Source / Medium", "Device Category", "ga_session_id"]
    },
    approach: [
      {
        step: "Event Parsing & Unnesting",
        description: "Parsed nested GA4 event parameters and item arrays using GoogleSQL and UNNEST to reconstruct usable behavioral, session, and product-level analytical fields."
      },
      {
        step: "26-Metric Framework Formulation",
        description: "Defined and standardized 26 analytical metrics spanning acquisition, activation, engagement, funnel performance, revenue, retention, customer value, product performance, marketing, and executive reporting."
      },
      {
        step: "23-Point Data Validation Suite",
        description: "Executed 23 PASS / WARNING / FAIL validation checks to identify data-quality limitations and establish explicit methodology rules before downstream analysis."
      }
    ],
    analysis: {
      summary: "54 validated SQL queries were used to analyze funnel behavior, activation, retention, revenue concentration, channel quality, and product performance.",
      keyFindings: [
        "Only 19.97% of first-time sessions reached a product view (52,171 of 261,238 first sessions), making activation the earliest major leak.",
        "82.47% of users were single-session users and Day-30 retention was 0.13%, consistent with a low-frequency purchase brand model.",
        "Session-scoped cart-to-checkout rate was 39.25% versus a naive ~66% event-level ratio, exposing a 27-point grain mismatch difference.",
        "Customer value is highly concentrated: 1,161 users (0.43% of users) account for approximately 62% of measured customer value.",
        "A privacy-redacted traffic segment (data deleted) converted at 3.14% (~2.8x next-best channel), contributing 12.97% of revenue from 6.17% of sessions.",
        "item_id was found to be unreliable as a cross-event join key, requiring item_name for affected cross-event joins.",
        "Mobile generated $1.025 revenue per session vs $0.999 on desktop; desktop cart abandonment was 81.73% vs 80.58% on mobile.",
        "42.91% of checkout sessions show no detectable prior add-to-cart event (cross-session cart persistence explains only 3.41%)."
      ]
    },
    insights: [
      {
        title: "Instrumentation Validation is Prerequisite to Insight",
        description: "Measurement issues can materially change the interpretation of funnel, engagement, and product metrics. Validation must precede executive reporting.",
        badge: "Data Quality"
      },
      {
        title: "Sessionization Precision Drives Funnel Accuracy",
        description: "Mixing event and session grains can materially overstate funnel performance. Session-scoped definitions are required for trustworthy conversion analysis.",
        badge: "Product Analytics"
      }
    ],
    recommendations: [
      {
        title: "Data & Reporting Integrity Lockdown",
        action: "Formalize the project's R1-R7 methodology rules into a repeatable validation and transformation layer so future reporting cannot silently reintroduce measurement issues.",
        expectedImpact: "More consistent and defensible reporting across funnel, revenue, product, and retention metrics."
      },
      {
        title: "Homepage & Navigation Activation Investigation",
        action: "Test homepage and navigation changes to identify whether the 80% early activation drop-off before viewing a product can be reduced.",
        expectedImpact: "Measured improvement in first-session product-view rate."
      },
      {
        title: "Checkout Payment-Step UX Investigation",
        action: "The largest measured checkout loss occurs between shipping info and payment info (38.6% drop). Investigate payment-step UX before implementing fixes.",
        expectedImpact: "Validated cause of checkout drop and measurable improvement in completion."
      },
      {
        title: "Paid Search Targeting Review",
        action: "Paid search (cpc/google) converts at 0.98% with 70.11% engagement (trailing organic at 1.11%). Review audience targeting and landing-page alignment.",
        expectedImpact: "Improved paid-search efficiency and evidence-based reallocation."
      }
    ],
    metrics: [
      {
        label: "ANALYZED VOLUME",
        value: "4.3M+ Events",
        trend: "4,295,584 GA4 Events",
        isPositive: true,
        context: "Public obfuscated sample dataset"
      },
      {
        label: "VALIDATED QUERIES",
        value: "54 Queries",
        trend: "26-Metric Framework",
        isPositive: true,
        context: "Production SQL queries mapped to questions"
      },
      {
        label: "DATA VALIDATION",
        value: "23 Checks",
        trend: "PASS / WARNING / FAIL Suite",
        isPositive: true,
        context: "Data-quality validation framework"
      }
    ],
    sqlSnippets: [
      {
        title: "Session-Scoped Funnel Reconstruction vs Event-Grain",
        query: `-- Session-scoped e-commerce funnel in Google BigQuery (Standard SQL)
WITH session_events AS (
  SELECT
    user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id,
    MAX(CASE WHEN event_name = 'view_item' THEN 1 ELSE 0 END) AS has_product_view,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) AS has_add_to_cart,
    MAX(CASE WHEN event_name = 'begin_checkout' THEN 1 ELSE 0 END) AS has_begin_checkout,
    MAX(CASE WHEN event_name = 'add_payment_info' THEN 1 ELSE 0 END) AS has_payment_info,
    MAX(CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END) AS has_purchased
  FROM \`bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*\`
  WHERE _TABLE_SUFFIX BETWEEN '20201101' AND '20210131'
  GROUP BY user_pseudo_id, session_id
)
SELECT
  COUNT(DISTINCT session_id) AS total_sessions,
  SUM(has_product_view) AS product_view_sessions,
  SUM(has_add_to_cart) AS add_to_cart_sessions,
  SUM(has_begin_checkout) AS checkout_start_sessions,
  SUM(has_payment_info) AS payment_info_sessions,
  SUM(has_purchased) AS purchase_sessions,
  -- Session-scoped cart-to-checkout rate (39.25% vs naive ~66% event ratio)
  ROUND(SAFE_DIVIDE(SUM(has_begin_checkout), SUM(has_add_to_cart)) * 100, 2) AS session_cart_to_checkout_rate,
  ROUND(SAFE_DIVIDE(SUM(has_purchased), SUM(has_begin_checkout)) * 100, 2) AS checkout_to_purchase_rate
FROM session_events;`,
        explanation: "Reconstructs the customer funnel at session grain, resolving the 27-percentage-point distortion caused by mixing event counts with session counts."
      }
    ],
    funnelData: [
      { step: "1. Total Sessions", users: 360129, conversionRate: 100, dropOffRate: 0, insight: "Baseline session traffic" },
      { step: "2. Product View", users: 77020, conversionRate: 21.39, dropOffRate: 78.61, insight: "Largest top-of-funnel drop" },
      { step: "3. Add to Cart", users: 15173, conversionRate: 4.21, dropOffRate: 80.30, insight: "Strong purchase intent milestone" },
      { step: "4. Begin Checkout", users: 11106, conversionRate: 3.08, dropOffRate: 26.80, insight: "39.25% session cart-to-checkout rate" },
      { step: "5. Payment Info", users: 6812, conversionRate: 1.89, dropOffRate: 38.66, insight: "Steepest drop within checkout flow" },
      { step: "6. Purchase", users: 4844, conversionRate: 1.35, dropOffRate: 28.89, insight: "Completed customer transactions" }
    ],
    thumbnail: "/assets/projects/ga4-preview.png",
    previewGradient: "from-cyan-950 via-slate-900 to-black",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/GA4_Ecommerce"
  },
  {
    id: "fintechco-bizops-financial-modeling",
    number: "02",
    title: "FINTECHCO. BIZOPS & FINANCIAL MODELING",
    category: "DATA ANALYTICS",
    year: "2026",
    featured: true,
    tagline: "6-Month CAC Payback, Customer Profitability & Cohort Risk Analysis",
    shortDescription: "BizOps analysis of 2.2K+ clients and 84K+ daily profitability records, evaluating CAC, profitability, cohort quality, and 180-day payback projections.",
    tools: ["SQL", "Excel Financial Modeling", "Cohort Analysis", "PowerPoint", "MS Word", "Git/GitHub"],
    
    problem: {
      statement: "A newly launched payments product needs to determine whether customer acquisition costs can be recovered within 180 days. The available dataset contains only the first three months of customer profitability, making direct observation of six-month payback impossible. Analysis therefore focuses on channel-level CAC, customer profitability, cohort quality, profitability ramp, and scenario-based payback projections.",
      context: "Reconciled 84,313 daily client-level records across 2,195 unique clients acquired between Jan 1, 2020 and Mar 31, 2020 with $133,413.80 in total Q1 marketing spend.",
      businessImpact: "The central decision is whether current acquisition economics provide enough evidence to scale confidently, or whether channel, cohort, and customer-profitability risks require further investigation."
    },
    data: {
      sources: [
        "84,313 daily client-level gross-profit records across 2,195 unique clients (Jan 1 - Mar 31, 2020)",
        "Marketing spend datasets across 6 sub-channels (Direct: Facebook, Google, LinkedIn; Partner: AffilCo, FundCo, ReferCo)",
        "Total Q1 acquisition spend: $133,413.80; Blended CAC: $60.78"
      ],
      volume: "84,313 daily records across 2,195 clients",
      dimensions: ["Client ID", "Account Creation Date", "Channel & Sub-channel", "Activity Date", "Daily Gross Profit"]
    },
    approach: [
      {
        step: "Unit Economic Reconciliation",
        description: "Calculated customer-level gross profit, channel economics, CAC, and average gross profit per customer across Direct and Partner acquisition channels."
      },
      {
        step: "Dynamic 180-Day Payback Modeling",
        description: "Built conservative and optimistic 180-day CAC recovery scenarios using observed customer profitability and the available maturity history."
      },
      {
        step: "Cohort & Profitability Risk Analysis",
        description: "Compared acquisition cohorts at matched tenure and analyzed zero-profit customers, profitability concentration, and customer profit-ramp behavior."
      }
    ],
    analysis: {
      summary: "Three months of data are insufficient to confirm 180-day CAC payback. The analysis therefore combines observed customer economics with conservative and optimistic extrapolation scenarios.",
      keyFindings: [
        "No customer has reached the 180-day observation horizon; all 180-day figures are projections rather than observed outcomes.",
        "Average gross profit generated per customer to date is $9.53 (median $3.16), compared with a blended CAC of $60.78.",
        "31.6% of acquired clients (693 of 2,195) have generated exactly $0 in gross profit to date.",
        "Profitability is highly concentrated: the top 10% of clients account for approximately 54.0% of total gross profit generated to date (top 1% accounts for 10.7%).",
        "Average gross profit per active client-day increases from ~$0.03 (days 0-9) to ~$0.62 (days 70-79), driven primarily by mature January clients.",
        "At matched 30-day tenure, January ($5.14) outperformed February ($4.68) and March ($3.71), providing an early signal of possible cohort-quality deterioration.",
        "Google is the only sub-channel projected above 100% CAC recovery under both conservative (127.4%) and optimistic (155.3%) scenarios.",
        "FundCo has the highest CAC ($170.81) but also the highest average gross profit per customer ($28.13) and the lowest zero-profit rate (16.8%)."
      ]
    },
    insights: [
      {
        title: "Channel-Level CAC Hides Sub-Channel Economics",
        description: "Blended channel metrics can obscure substantial differences between acquisition sources. FundCo has the highest CAC at $170.81, but also the highest observed average gross profit per customer at $28.13.",
        badge: "Unit Economics"
      },
      {
        title: "Zero-Profit Customers Create Structural Payback Risk",
        description: "31.6% of acquired clients have generated no gross profit to date. The dataset cannot establish whether these customers are churned or delayed in activation, making this segment a priority for investigation.",
        badge: "Customer Profitability"
      }
    ],
    recommendations: [
      {
        title: "Build a Cohort-Based CAC Payback Dashboard",
        action: "Track CAC, cumulative gross profit, payback progress, and customer maturity by acquisition cohort and sub-channel as additional customer history becomes available.",
        expectedImpact: "Replace one-time payback analysis with continuous visibility into cohort economics."
      },
      {
        title: "Investigate Zero-Profit Customers",
        action: "Segment the 693 zero-profit customers by channel, cohort, tenure, and behavioral indicators to determine whether the issue reflects delayed activation or acquisition quality.",
        expectedImpact: "Identify drivers of zero-profit acquisition and determine whether onboarding interventions are justified."
      },
      {
        title: "Validate FundCo Acquisition Economics",
        action: "FundCo has the highest blended CAC ($170.81) but also the strongest observed customer economics. Validate downstream profitability before altering investment.",
        expectedImpact: "Evidence-based decision on high-CAC channel budget allocation."
      },
      {
        title: "Extend the Payback Observation Window",
        action: "Continue tracking existing cohorts until they reach the 180-day horizon before treating CAC payback as achieved or missed.",
        expectedImpact: "Replace extrapolated payback estimates with observed customer economics."
      }
    ],
    metrics: [
      {
        label: "ANALYZED SCALE",
        value: "84.3K Records",
        trend: "2,195 Unique Clients",
        isPositive: true,
        context: "Daily client-level gross-profit records"
      },
      {
        label: "CAC PAYBACK TARGET",
        value: "180-Day Model",
        trend: "Conservative vs Optimistic",
        isPositive: true,
        context: "Projected CAC recovery scenarios"
      },
      {
        label: "PROFIT CONCENTRATION",
        value: "Top 10% → 54%",
        trend: "Top 1% → 10.7%",
        isPositive: false,
        context: "Share of total gross profit"
      }
    ],
    sqlSnippets: [
      {
        title: "FinTechCo Sub-Channel CAC and Payback Ratio Analysis",
        query: `-- Calculate sub-channel CAC, gross profit, and observed payback ratio in MySQL
SELECT
  c.sub_channel,
  COUNT(DISTINCT c.client_id) AS total_clients,
  ROUND(s.spend_amount / COUNT(DISTINCT c.client_id), 2) AS sub_channel_cac,
  ROUND(SUM(p.daily_gross_profit), 2) AS total_gross_profit,
  ROUND(SUM(p.daily_gross_profit) / COUNT(DISTINCT c.client_id), 2) AS avg_profit_per_client,
  ROUND(
    (SUM(p.daily_gross_profit) / COUNT(DISTINCT c.client_id)) / 
    (s.spend_amount / COUNT(DISTINCT c.client_id)) * 100, 
    2
  ) AS current_observed_recovery_pct,
  COUNT(CASE WHEN client_total.profit <= 0 THEN 1 END) AS zero_profit_clients,
  ROUND(COUNT(CASE WHEN client_total.profit <= 0 THEN 1 END) * 100.0 / COUNT(DISTINCT c.client_id), 1) AS zero_profit_pct
FROM client_master c
JOIN marketing_spend s ON c.sub_channel = s.sub_channel
LEFT JOIN daily_profit_records p ON c.client_id = p.client_id
LEFT JOIN (
  SELECT client_id, SUM(daily_gross_profit) AS profit 
  FROM daily_profit_records 
  GROUP BY client_id
) client_total ON c.client_id = client_total.client_id
GROUP BY c.sub_channel, s.spend_amount
ORDER BY current_observed_recovery_pct DESC;`,
        explanation: "Computes channel-level CAC, customer profitability, and payback ratios to compare acquisition efficiency across sub-channels."
      }
    ],
    thumbnail: "/assets/projects/fintech-preview.png",
    previewGradient: "from-emerald-950 via-slate-900 to-black",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/FinTechCo_bizops"
  },
  {
    id: "thelook-ecommerce-product-analytics",
    number: "03",
    title: "THELOOK E-COMMERCE PRODUCT ANALYTICS ENGINE",
    category: "PRODUCT ANALYTICS",
    year: "2026",
    featured: true,
    tagline: "100K Users, 124.8K Orders & 90 Business Questions Across the Customer Lifecycle",
    shortDescription: "Analyzed 100K users and 124.8K orders across 90 business questions using BigQuery for product, customer, revenue, and operational analytics.",
    tools: ["GoogleSQL", "Google BigQuery", "Cohort Analysis", "RFM Segmentation", "Git/GitHub"],
    
    problem: {
      statement: "An e-commerce platform requires a structured view of customer conversion, repeat purchasing, product performance, revenue concentration, profitability, returns, and operational behavior. I translated 90 business questions into a reusable BigQuery analysis framework covering the customer journey from acquisition and first purchase through repeat behavior, product economics, and operational performance.",
      context: "Dissected 100,000 registered users, 124,771 orders, and $10.79M in total revenue across 26 product categories, 14 countries, and 10 distribution centers.",
      businessImpact: "The analysis identifies the customer, product, and operational levers most relevant to conversion, retention, revenue growth, profitability, and merchandising decisions."
    },
    data: {
      sources: [
        "BigQuery public TheLook E-commerce dataset",
        "Primary tables: Users, Orders, Order Items, Products, Events, Inventory Items, Distribution Centers",
        "Total scope: 100,000 registered users, 124,771 orders, $10,788,793.60 revenue, $5,601,351.63 profit"
      ],
      volume: "100,000 registered users, 124,771 orders across 26 product categories",
      dimensions: ["Customer Cohort Month", "Product Category", "Order Status", "Traffic Channel", "Country / Distribution Center"]
    },
    approach: [
      {
        step: "90 Business Question Matrix",
        description: "Structured 90 business questions across customer, product, revenue, retention, marketing, profitability, operations, engagement, inventory, and geographic analysis."
      },
      {
        step: "BigQuery Dimensional Analysis",
        description: "Built GoogleSQL queries using CTEs, joins, aggregation, window functions, ranking, segmentation logic, date analysis, and validated business definitions."
      },
      {
        step: "Customer & Product Behavior Segmentation",
        description: "Applied repeat-purchase analysis, customer value segmentation, frequency segmentation, lifecycle status, cohort analysis, traffic-source analysis, and product-level performance analysis."
      }
    ],
    analysis: {
      summary: "Evaluated customer lifecycle dynamics, category margins, return patterns, and fulfillment logistics across 90 analytical questions.",
      keyFindings: [
        "79.95% of registered users placed at least one order (79,948 ordered customers of 100,000 registered users).",
        "Repeat customers represent 37.3% of buyers (29,851 users) but generate 59.9% of total revenue ($6.46M of $10.79M).",
        "Repeat customers average $216.49 in revenue versus $86.36 for one-time buyers (a 2.5x revenue multiple).",
        "Customer Value Segmentation: Low Value (78.53%, $77.98 avg), Medium Value (19.00%, $298.43 avg), High Value (2.27%, $649.23 avg), VIP (0.20%, $1,133.01 avg).",
        "Revenue is broadly distributed: Top 10 customers drive 0.14% of revenue; top 10 products drive 1.23% of revenue.",
        "Outerwear & Coats ($1.34M, 12.45%) and Jeans ($1.24M, 11.52%) form the two largest category revenue contributors (23.97% combined).",
        "Revenue scale and margin rank differ: Blazers & Jackets holds the highest category profit margin (62.03%) despite lower revenue.",
        "Search is the dominant traffic source driving 69.63% of revenue ($7.51M) with a 79.91% conversion rate (Organic: 80.52%, Display: 81.16%).",
        "Overall return rate is 9.83% (12,270 returned orders), tightly clustered across categories (9.09% to 10.81%)."
      ]
    },
    insights: [
      {
        title: "Repeat Customers Drive Disproportionate Revenue",
        description: "Repeat customers represent 37.3% of ordered customers but contribute 59.9% of total revenue. Their average revenue per customer is approximately 2.5x that of one-time buyers.",
        badge: "Retention"
      },
      {
        title: "High-Value Customers Warrant Differentiated Retention",
        description: "The High Value and VIP segments contain only 1,974 customers but show substantially higher revenue per customer than the broader customer base.",
        badge: "Customer Segmentation"
      }
    ],
    recommendations: [
      {
        title: "Prioritize First-to-Second Purchase Conversion",
        action: "Use post-purchase engagement and repeat-purchase initiatives to convert first-time buyers into repeat customers.",
        expectedImpact: "Increase repeat-purchase rate and repeat revenue contribution."
      },
      {
        title: "Build Value-Based Customer Retention",
        action: "Develop differentiated retention strategies for High Value and VIP customers while maintaining scalable lifecycle campaigns for the broader customer base.",
        expectedImpact: "Protect and grow revenue from the highest-value customer segments."
      },
      {
        title: "Pair Revenue Rank with Margin",
        action: "Use both revenue contribution and profit margin when prioritizing categories. Blazers & Jackets has the highest margin (62.03%) despite lower revenue.",
        expectedImpact: "Improve merchandising and product-prioritization decisions using both scale and profitability."
      },
      {
        title: "Investigate Search Conversion",
        action: "Search contributes 69.63% of total revenue with a 79.91% conversion rate. Investigate landing-page behavior to understand whether the conversion gap versus Organic can be reduced.",
        expectedImpact: "Improve conversion efficiency on the largest traffic source."
      }
    ],
    metrics: [
      {
        label: "ANALYZED SCALE",
        value: "100K Users",
        trend: "124,771 Orders",
        isPositive: true,
        context: "79,948 Ordered Customers"
      },
      {
        label: "REPEAT BUYER VALUE",
        value: "2.5x Revenue / Customer",
        trend: "$216.49 vs $86.36",
        isPositive: true,
        context: "59.9% total revenue contribution"
      },
      {
        label: "DECISION FRAMEWORK",
        value: "90 Questions",
        trend: "8 Analytical Domains",
        isPositive: true,
        context: "Comprehensive BigQuery analysis"
      }
    ],
    sqlSnippets: [
      {
        title: "TheLook Repeat Buyer Revenue & Order Frequency",
        query: `-- Aggregate customer-level orders and calculate repeat-buyer revenue multiple in BigQuery
WITH customer_orders AS (
  SELECT
    user_id,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(sale_price) AS total_revenue,
    MIN(created_at) AS first_order_date,
    MAX(created_at) AS latest_order_date
  FROM \`thelook_ecommerce.order_items\`
  WHERE status NOT IN ('Cancelled', 'Returned')
  GROUP BY user_id
)
SELECT
  CASE WHEN total_orders = 1 THEN 'One-Time Customer' ELSE 'Repeat Customer (2+ Orders)' END AS customer_segment,
  COUNT(user_id) AS total_customers,
  ROUND(COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM customer_orders), 2) AS pct_of_customers,
  ROUND(SUM(total_revenue), 2) AS total_revenue,
  ROUND(SUM(total_revenue) * 100.0 / (SELECT SUM(total_revenue) FROM customer_orders), 2) AS pct_of_revenue,
  ROUND(AVG(total_revenue), 2) AS avg_revenue_per_customer,
  ROUND(AVG(total_revenue) / (SELECT AVG(total_revenue) FROM customer_orders WHERE total_orders = 1), 2) AS revenue_multiple
FROM customer_orders
GROUP BY customer_segment;`,
        explanation: "Transforms order-level data into customer-level metrics to classify one-time and repeat buyers and compare their revenue contribution."
      }
    ],
    thumbnail: "/assets/projects/thelook-preview.png",
    previewGradient: "from-blue-950 via-slate-900 to-black",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/thelookecommerce_sql"
  },
  {
    id: "flightiq-airline-bi-dashboard",
    number: "04",
    title: "FLIGHTIQ - AIRLINE BUSINESS INTELLIGENCE & OPERATIONS",
    category: "BUSINESS INTELLIGENCE",
    year: "2026",
    featured: true,
    tagline: "10.7K Flight Records Across 12 Airlines",
    shortDescription: "End-to-end airline business intelligence analysis of 10,669 flight records across 12 airlines, evaluating revenue, demand, pricing, operational performance, and route intelligence.",
    tools: ["Power BI", "MySQL", "SQL", "Excel", "Business Intelligence", "Git/GitHub"],
    
    problem: {
      statement: "Airline management needs a consolidated view of commercial performance, market demand, pricing behaviour, operational efficiency, and route performance to support revenue management, capacity planning, and network decisions.",
      context: "Analyzed 10,669 flight records across 12 carriers and 128 distinct routes from a 2019 commercial aviation operational dataset.",
      businessImpact: "Translate fragmented flight-level operational data into business-ready insights for revenue optimization, route prioritization, pricing evaluation, and operational planning."
    },
    data: {
      sources: [
        "2019 airline operational dataset (10,669 flight records across 12 airlines)",
        "Key attributes: Airline, Journey Date/Month, Time Slots, Source, Destination, Route, Flight Duration, Total Stops, Ticket Price",
        "Total Scope: ₹96.91M revenue, 128 routes, 641.92 min average duration"
      ],
      volume: "10,669 flight records across 12 airlines and 128 routes",
      dimensions: ["Airline Carrier", "Origin & Destination Airport", "Route Type (Direct vs Connecting)", "Duration Minutes", "Ticket Price"]
    },
    approach: [
      {
        step: "Data Cleaning & Transformation",
        description: "Cleaned and standardized airline records in Excel, handled missing and inconsistent values, standardized date/time fields, and prepared analytical features for SQL."
      },
      {
        step: "SQL Business Analytics",
        description: "Built business-driven SQL analysis covering commercial performance, demand, pricing, operational KPIs, and route-level revenue and demand."
      },
      {
        step: "Power BI Decision Support",
        description: "Translated analytical results into executive-style performance views for airline benchmarking, pricing evaluation, operational analysis, and network planning."
      }
    ],
    analysis: {
      summary: "Evaluated commercial revenue contribution, fare dispersion, market share, and route corridors across 10,669 flights.",
      keyFindings: [
        "Jet Airways generated the highest revenue at approximately ₹44.69M, representing about 46.1% of total revenue.",
        "Air India ranked second in revenue contribution at approximately ₹16.79M (17.3% of total revenue).",
        "Jet Airways led flight volume with 3,840 flights (36.0% of total flights), followed by IndiGo (2,053 flights) and Air India (1,747 flights).",
        "Jet Airways, IndiGo, and Air India together account for roughly 72% of total flight volume.",
        "Jet Airways Business recorded the highest average fare at approximately ₹58.36K, while Air India averaged ₹9.61K across mixed cabin classes.",
        "DEL → BOM → COK was the highest revenue-generating route at approximately ₹26.03M.",
        "BLR → BOM → DEL recorded the highest average fare among top-revenue routes at approximately ₹15.72K."
      ]
    },
    insights: [
      {
        title: "Jet Airways Revenue Dominance",
        description: "Jet Airways generated approximately ₹44.69M in revenue, contributing about 46.1% of total dataset revenue.",
        badge: "Commercial Signal"
      },
      {
        title: "High-Value Route Corridors",
        description: "DEL → BOM → COK generated approximately ₹26.03M in route revenue, while several high-demand corridors combine strong revenue and fare performance.",
        badge: "Network Signal"
      },
      {
        title: "Wide Fare Dispersion",
        description: "Average fares vary substantially across airlines, reflecting differences in network structure, service positioning, and pricing strategy.",
        badge: "Pricing Signal"
      },
      {
        title: "Concentrated Flight Volume",
        description: "Jet Airways, IndiGo, and Air India together account for roughly 72% of total flight volume, making them the dominant operational players.",
        badge: "Market Signal"
      }
    ],
    recommendations: [
      {
        title: "Revenue Management Benchmarking",
        action: "Benchmark Air India's pricing and revenue performance against leading airlines, especially on high-value routes and high-fare corridors.",
        expectedImpact: "Identify pricing and revenue-yield opportunities."
      },
      {
        title: "High-Demand Route Capacity Planning",
        action: "Prioritize high-demand, high-revenue routes (such as DEL-BOM-COK) for capacity and fleet-allocation review.",
        expectedImpact: "Improve network planning by focusing resources on commercially attractive corridors."
      },
      {
        title: "Pricing Strategy Optimization",
        action: "Evaluate fare structures by airline, route, and demand profile to identify opportunities for more differentiated pricing.",
        expectedImpact: "Improve revenue yield while maintaining competitive positioning."
      },
      {
        title: "Direct Connectivity Review",
        action: "Evaluate high-demand routes where greater direct connectivity could improve network efficiency and passenger convenience.",
        expectedImpact: "Support evidence-based network design decisions."
      }
    ],
    metrics: [
      {
        label: "ANALYZED SCALE",
        value: "10.7K Flights",
        trend: "12 Airline Carriers",
        isPositive: true,
        context: "Comprehensive 2019 airline operational dataset"
      },
      {
        label: "COMMERCIAL SCALE",
        value: "₹96.91M Revenue",
        trend: "₹9,082.93 Avg Fare",
        isPositive: true,
        context: "Airline-wide commercial performance"
      },
      {
        label: "NETWORK SCOPE",
        value: "128 Routes",
        trend: "641.92 min Avg Duration",
        isPositive: true,
        context: "Route-level revenue and demand analysis"
      }
    ],
    sqlSnippets: [
      {
        title: "Executive Airline Performance Dashboard Query",
        query: `-- Executive Airline Performance Dashboard Query in MySQL
SELECT
  Airline,
  COUNT(*) AS Flights,
  SUM(Price) AS Revenue,
  ROUND(AVG(Price), 2) AS Avg_Fare,
  ROUND(AVG(Duration_Minutes), 2) AS Avg_Duration,
  ROUND(
    SUM(CASE WHEN Route_Type = 'Direct' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 
    2
  ) AS Direct_Flight_Percentage,
  ROUND(
    SUM(CASE WHEN Arrival_Date > Journey_Date THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 
    2
  ) AS Overnight_Flight_Percentage
FROM flight_data
GROUP BY Airline
ORDER BY Revenue DESC;`,
        explanation: "Aggregates airline-level flight volume, revenue, average fare, average duration, direct-flight share, and overnight-flight share for executive performance benchmarking."
      }
    ],
    thumbnail: "/assets/projects/flightiq-preview.png",
    previewGradient: "from-purple-950 via-slate-900 to-black",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/FlightIQ"
  },
  {
    id: "launchiq-ai",
    number: "05",
    title: "LAUNCHIQ.AI",
    category: "AI & PRODUCT",
    year: "2026",
    featured: true,
    tagline: "AI-Powered Product Launch Intelligence Platform",
    shortDescription: "AI-powered product launch intelligence for evaluating market potential, risk, pricing, competition, and go-to-market strategy before launch.",
    tools: ["React", "TypeScript", "Qwen / OpenRouter", "Supabase", "PostgreSQL", "Vercel", "Git/GitHub"],
    
    problem: {
      statement: "Product teams often make launch decisions with incomplete visibility into customer purchase intent, market sentiment, pricing, competitive pressure, and go-to-market risk. LaunchIQ.ai turns structured product inputs into a consulting-style launch intelligence simulation before the product reaches the market.",
      context: "Full-stack AI SaaS product connecting user-provided product specifications with LLM reasoning, schema validation, and persistent simulation tracking.",
      businessImpact: "Provides a structured decision-support workflow for product managers, founders, analysts, and strategy teams evaluating launch readiness."
    },
    data: {
      sources: [
        "Structured product launch inputs: Product Name, Category, Industry, Target Audience, Price, Region, Features, Competitors, Launch Goal",
        "AI simulation engine powered by Qwen LLM via OpenRouter",
        "Persistent PostgreSQL database via Supabase Auth & Storage"
      ],
      volume: "Structured product input variables transformed into multi-dimensional intelligence",
      dimensions: ["Target Audience", "Product Category", "Pricing Tier", "Competitive Landscape", "Regional Market"]
    },
    approach: [
      {
        step: "Product Input Structuring",
        description: "Collect structured product, audience, pricing, competitor, regional, feature, and launch-goal inputs to define the simulation context."
      },
      {
        step: "AI Strategic Analysis",
        description: "Generate product-specific launch intelligence using structured prompts and the Qwen LLM through an OpenAI-compatible API workflow."
      },
      {
        step: "Structured Decision Output",
        description: "Validate AI responses against a Zod schema and transform them into consistent strategic outputs for the results dashboard."
      }
    ],
    analysis: {
      summary: "Transforms structured product concepts into multiple layers of strategic decision intelligence, risk assessment, and SWOT analysis.",
      keyFindings: [
        "Purchase Likelihood provides a directional estimate of potential customer adoption based on product-market context.",
        "Launch Risk Scoring highlights potential strategic, competitive, and execution risks before market entry.",
        "Market Sentiment summarizes expected consumer reaction (Positive, Mixed, or Negative) to the proposed concept.",
        "SWOT Intelligence generates product-specific strengths, weaknesses, opportunities, and threats.",
        "Pricing & GTM strategy modules convert simulation assessments into actionable strategic recommendations.",
        "Persistent simulation history enables teams to compare product scenarios and export structured PDF reports."
      ]
    },
    insights: [
      {
        title: "From Product Idea to Strategic Brief",
        description: "LaunchIQ.ai converts structured product context into an executive-ready strategic assessment covering market potential, risks, pricing, competition, and go-to-market direction.",
        badge: "AI Decision Support"
      },
      {
        title: "Consistent AI Outputs",
        description: "Structured JSON parsing and runtime validation keep AI-generated results aligned with a predictable application schema.",
        badge: "Structured Intelligence"
      },
      {
        title: "Simulations Built for Revisiting",
        description: "Supabase persistence allows users to save, search, revisit, compare, and export previous launch simulations.",
        badge: "Persistent Workflow"
      },
      {
        title: "Multi-Dimensional Launch Analysis",
        description: "One simulation combines purchase likelihood, launch risk, sentiment, pricing, competitive positioning, GTM strategy, SWOT, and recommendations.",
        badge: "Product Strategy"
      }
    ],
    recommendations: [
      {
        title: "Run Multiple Launch Scenarios",
        action: "Test alternative pricing, audiences, competitors, regions, and product positioning to compare how strategic assumptions change the launch assessment.",
        expectedImpact: "Use scenario comparison to stress-test launch assumptions before market entry."
      },
      {
        title: "Compare Competitive Positioning",
        action: "Run simulations with different competitor sets and positioning assumptions to evaluate alternative strategic narratives.",
        expectedImpact: "Identify positioning strategies that appear more defensible within the submitted market context."
      },
      {
        title: "Iterate on Pricing",
        action: "Evaluate different product prices and compare the resulting AI-generated pricing and launch recommendations.",
        expectedImpact: "Use structured scenario testing to support pricing decisions."
      },
      {
        title: "Build a Reusable Launch Library",
        action: "Use persistent simulation history to revisit previous launch scenarios and compare strategic outputs over time.",
        expectedImpact: "Create a repeatable decision-support workflow instead of one-off analysis."
      }
    ],
    metrics: [
      {
        label: "AI ENGINE",
        value: "Qwen LLM",
        trend: "via OpenRouter API",
        isPositive: true,
        context: "Structured launch analysis workflow"
      },
      {
        label: "DATA VALIDATION",
        value: "Zod + JSON",
        trend: "Runtime Schema Guardrails",
        isPositive: true,
        context: "Runtime-validated AI responses"
      },
      {
        label: "PERSISTENCE",
        value: "Supabase",
        trend: "PostgreSQL Database",
        isPositive: true,
        context: "Auth and persistent simulation history"
      }
    ],
    architectureSteps: [
      { step: "01", title: "User Product Input", description: "Structured product name, audience, pricing, competitor, and feature context." },
      { step: "02", title: "React + TS Frontend", description: "Interactive client UI with validation, simulation state, and routing." },
      { step: "03", title: "Simulation Engine", description: "OpenAI-compatible prompt engineering orchestrating structured prompts." },
      { step: "04", title: "Qwen LLM (OpenRouter)", description: "Generates comprehensive JSON assessment across launch dimensions." },
      { step: "05", title: "Zod Schema Validation", description: "Strict runtime parsing constraining numeric scores and required fields." },
      { step: "06", title: "Supabase PostgreSQL", description: "Authenticated persistence for simulation history, comparison, and PDF export." },
      { step: "07", title: "Launch Intelligence Dashboard", description: "Executive summary, risk radar, SWOT, and strategic action plans." }
    ],
    thumbnail: "/assets/projects/launchiq-preview.png",
    previewGradient: "from-cyan-950 via-slate-900 to-black",
    liveUrl: "https://launch-iq-ai.vercel.app/",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/LaunchIQ.ai"
  },
  {
    id: "vahan-ai-product-analytics",
    number: "06",
    title: "VAHAN.AI - PRODUCT ANALYTICS, FUNNEL & FT CONVERSION DRIVERS",
    category: "PRODUCT ANALYTICS",
    year: "2026",
    featured: true,
    tagline: "Product Analytics, Funnel & FT Conversion Drivers",
    shortDescription: "Product analytics case study analyzing 18.2K gig-work leads across 16 cohorts to identify funnel leakage, high-converting sourcing channels, and the drivers of First Trip conversion.",
    tools: ["Excel", "BigQuery SQL", "Python", "scikit-learn", "Product Analytics", "Git/GitHub"],
    
    problem: {
      statement: "Vahan sources gig-work candidates from multiple lead-source cohorts and needs to understand which sourcing channels convert best, where the recruitment funnel loses volume, and which factors are associated with candidates reaching First Trip (FT).",
      context: "Analyzed 18,198 lead-level records across 16 lead-source cohorts uploaded between 18 Jul 2026 and 6 Aug 2026.",
      businessImpact: "Identify the largest operational funnel leaks, benchmark cohort performance, and prioritize sourcing and call-center capacity using evidence from the end-to-end Lead → FT funnel."
    },
    data: {
      sources: [
        "18,198 lead-level records across 16 lead-source cohorts (18 Jul - 6 Aug 2026)",
        "Attributes: candidate_phone, lead_source, upload_date, Attempted, Connected, tag_filled, Interested, OB_after_upload, FT_after_upload, Attempt-per-Lead",
        "Unique phones: 17,097; 1,100 cross-cohort re-targets (0 same-cohort duplicates)"
      ],
      volume: "18,198 lead-level records across 16 cohorts",
      dimensions: ["Lead Source Cohort", "Upload Date", "Attempt Status", "Connect Status", "First Trip (FT)"]
    },
    approach: [
      {
        step: "Data Profiling & Quality",
        description: "Validated dataset grain, cohort structure, missing keys, repeated candidates, cohort maturity, and funnel-state relationships before trusting conversion metrics."
      },
      {
        step: "Funnel & Cohort Analysis",
        description: "Rebuilt the Lead → Attempted → Connected → Interested → OB → FT funnel and ranked mature, sufficiently large cohorts on Lead → FT conversion."
      },
      {
        step: "Conversion Driver Model",
        description: "Used class-weighted logistic regression with 5-fold stratified cross-validation to identify factors associated with FT conversion while excluding leakage variables."
      }
    ],
    analysis: {
      summary: "Identified that 34.2% of leads were never attempted, making initial call coverage the largest operational bottleneck in the candidate funnel.",
      keyFindings: [
        "34.2% of leads were never attempted (6,225 of 18,198 leads lost), representing the largest controllable volume leak in the funnel.",
        "Attempted → Connected loses 35.3% of total lead volume (6,423 leads lost; only 46.35% of attempted leads connected).",
        "0.30% of all leads reached First Trip (54 FT conversions from 18,198 leads).",
        "Interested is not a reliable funnel gate: 116 of 119 OB events and 53 of 54 FT events occurred without Interested = 1.",
        "Top mature cohorts (>=1,000 leads, >=5 days old): Single Referral > 7 days 24th Jul (0.933% FT), Khanna - 2W 26th Jul (0.906% FT), PreOb-Ob Fees Paid 29th Jul set 1 (0.472% FT).",
        "Logistic regression (ROC-AUC 0.798, Recall 79.6%) identified Attempted (+5.22) and tag_filled (+2.63) as the strongest positive model-associated conversion factors."
      ]
    },
    insights: [
      {
        title: "34% of Leads Are Never Attempted",
        description: "6,225 of 18,198 leads never receive a call attempt, making Lead → Attempted the largest controllable volume leak in the funnel.",
        badge: "Operations"
      },
      {
        title: "Interested is Not a Reliable Funnel Gate",
        description: "53 of 54 FT events and 116 of 119 OB events occur without Interested being set to 1, indicating inconsistent use of the tag.",
        badge: "Measurement"
      },
      {
        title: "Referral & Pre-Qualified Cohorts Outperform",
        description: "Single Referral, Khanna-2W, and PreOb-Ob batches show positive cohort-level conversion signals, with the top two reaching approximately 0.9% Lead → FT.",
        badge: "Cohort Strategy"
      },
      {
        title: "Attempted is the Strongest Model Driver",
        description: "Attempted has the strongest positive coefficient (+5.22) in the FT driver model, reinforcing the operational importance of getting leads into the calling workflow.",
        badge: "Model Intelligence"
      }
    ],
    recommendations: [
      {
        title: "Close the Never-Attempted Gap",
        action: "Audit CRM and dialer routing to ensure every uploaded lead enters the calling queue. If capacity is constrained, use lead propensity scoring to prioritize.",
        expectedImpact: "Increase first-attempt coverage and recover volume currently lost before any candidate interaction occurs."
      },
      {
        title: "Shift Sourcing Toward High-Converting Cohort Types",
        action: "Increase future sourcing exposure to Single Referral and Khanna-2W-style channels while monitoring mature cohort-level FT conversion.",
        expectedImpact: "Improve sourcing mix based on observed conversion performance."
      },
      {
        title: "Stop Using Interested as a Required Funnel Gate",
        action: "Remove Interested as a mandatory conversion checkpoint in dashboards and incentive logic. If retained, standardize how agents apply the tag.",
        expectedImpact: "Improve funnel measurement integrity and reduce misleading conversion-stage interpretation."
      },
      {
        title: "Use FT Propensity for Call-Center Triage",
        action: "Use the logistic-regression score to rank leads by predicted FT propensity and prioritize scarce calling capacity.",
        expectedImpact: "Improve allocation of existing call-center capacity toward higher-propensity leads."
      }
    ],
    metrics: [
      {
        label: "ANALYZED SCALE",
        value: "18.2K Leads",
        trend: "18,198 Lead Records",
        isPositive: true,
        context: "16 lead-source cohorts"
      },
      {
        label: "COHORT SCOPE",
        value: "16 Cohorts",
        trend: "18 Jul - 6 Aug 2026",
        isPositive: true,
        context: "Lead-source cohort analysis"
      },
      {
        label: "BUSINESS OUTCOME",
        value: "54 FT Conversions",
        trend: "0.30% Lead → FT",
        isPositive: true,
        context: "First Trip conversion milestone"
      }
    ],
    sqlSnippets: [
      {
        title: "Vahan Candidate Funnel Aggregation & Stage Rates",
        query: `-- Compute overall Vahan lead-to-first-trip conversion funnel in BigQuery
SELECT
  COUNT(*) AS total_leads,
  SUM(Attempted) AS attempted_leads,
  SUM(Connected) AS connected_leads,
  SUM(Interested) AS interested_leads,
  SUM(OB_after_upload) AS onboarded_leads,
  SUM(FT_after_upload) AS first_trip_leads,
  -- Stage-over-total conversion percentages
  ROUND(SAFE_DIVIDE(SUM(Attempted), COUNT(*)) * 100, 2) AS attempt_rate_pct,
  ROUND(SAFE_DIVIDE(SUM(Connected), COUNT(*)) * 100, 2) AS connect_rate_pct,
  ROUND(SAFE_DIVIDE(SUM(FT_after_upload), COUNT(*)) * 100, 2) AS ft_rate_pct,
  -- Step-over-step conversion percentages
  ROUND(SAFE_DIVIDE(SUM(Connected), NULLIF(SUM(Attempted), 0)) * 100, 2) AS attempt_to_connect_pct,
  ROUND(SAFE_DIVIDE(SUM(FT_after_upload), NULLIF(SUM(OB_after_upload), 0)) * 100, 2) AS ob_to_ft_pct
FROM \`vahan_analytics.candidate_leads\`;`,
        explanation: "Aggregates the end-to-end candidate funnel and calculates both stage-over-previous-stage and stage-over-total-leads conversion metrics."
      }
    ],
    funnelData: [
      { step: "1. Lead Uploaded", users: 18198, conversionRate: 100, dropOffRate: 0, insight: "18,198 candidate leads" },
      { step: "2. Attempted", users: 11973, conversionRate: 65.79, dropOffRate: 34.21, insight: "6,225 leads never attempted (34.2% leak)" },
      { step: "3. Connected", users: 5550, conversionRate: 30.50, dropOffRate: 53.65, insight: "46.35% of attempted connected" },
      { step: "4. Interested (Tag)", users: 348, conversionRate: 1.91, dropOffRate: 93.73, insight: "Tagging metric, not a hard conversion gate" },
      { step: "5. Onboarded (OB)", users: 119, conversionRate: 0.65, dropOffRate: 65.80, insight: "116 OB events occurred without Interested tag" },
      { step: "6. First Trip (FT)", users: 54, conversionRate: 0.30, dropOffRate: 54.62, insight: "Final revenue-generating conversion milestone" }
    ],
    thumbnail: "/assets/projects/vahan-preview.png",
    previewGradient: "from-blue-950 via-slate-900 to-black",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/vahan.ai_pa"
  },
  {
    id: "blinkmoney-save-journey-analytics",
    number: "07",
    title: "BLINKMONEY - FINTECH PRODUCT ANALYTICS & SAVE JOURNEY FUNNEL",
    category: "PRODUCT ANALYTICS",
    year: "2026",
    featured: true,
    tagline: "Fintech Product Analytics across a 10-Stage Save Journey",
    shortDescription: "Fintech product analytics case study analyzing the 10-stage Save journey to identify onboarding drop-offs, instrumentation gaps, and critical backend reconciliation failures.",
    tools: ["PostgreSQL", "SQL", "Product Analytics", "Funnel Analysis", "Event Instrumentation", "Git/GitHub"],
    
    problem: {
      statement: "BlinkMoney's Save journey combines identity verification, bank linking, UPI mandate authorization, investment consent, and fund settlement. Product teams need to know where users drop, which failures are true UX leaks versus external-system delays, and where instrumentation can distinguish the two.",
      context: "Distinct-user funnel profiling across a 10-stage onboarding flow entering with 4,102 app-open users and reaching 588 activated users (First Unit Credited).",
      businessImpact: "Identify the highest-impact funnel leaks, separate user friction from asynchronous system dependencies, and create measurable instrumentation for engineering and product teams."
    },
    data: {
      sources: [
        "10-stage Save journey distinct-user profiling data (4,102 app_open entries)",
        "Underlying event schema: events(event_id text, user_id text, event_name text, event_ts timestamp, properties jsonb)",
        "Database target: PostgreSQL"
      ],
      volume: "4,102 app-open users across 10 milestone stages",
      dimensions: ["User ID", "Event Name", "Timestamp", "External Confirmation Flag", "Step Order"]
    },
    approach: [
      {
        step: "Journey Mapping & Instrumentation",
        description: "Mapped the complete Save journey and designed a capped event taxonomy focused on decision-useful milestones rather than instrumenting every screen interaction."
      },
      {
        step: "Funnel & Drop-Off Analysis",
        description: "Reconstructed the 10-stage funnel using distinct users per stage and calculated step-over-step conversion, absolute losses, and overall conversion."
      },
      {
        step: "Product Diagnosis & SQL",
        description: "Used PostgreSQL SQL, data-quality checks, external-system logic, and a real onboarding walkthrough to distinguish product friction from asynchronous confirmation failures."
      }
    ],
    analysis: {
      summary: "Diagnosed the largest absolute funnel leak at Bank Verification (1,192 users lost, 52.1% drop) and reproduced a backend UPI mandate reconciliation failure.",
      keyFindings: [
        "Bank Verification is the largest funnel leak: 1,192 users are lost between SIP amount selection and bank verification (52.1% drop).",
        "Mandate Completion is the second-largest drop: 367 users lost (33.4% step drop) after having already completed identity and bank verification.",
        "Final investment activation reaches 588 users from 4,102 app-open entries (14.3% overall journey conversion).",
        "Mandate reconciliation defect reproduced: Google Pay and SBI confirmed UPI mandate approval, but BlinkMoney returned Internal Server Error, leaving the user in Mandate Pending.",
        "External Confirmation stages (PAN, Bank, Mandate, First Unit) depend on external registries and banks; elapsed time does not equal pure in-app UX friction.",
        "SIP Amount Selected had 14,205 event rows for 2,290 users (~6.2 events/user), reflecting frequent amount revisions before commitment."
      ]
    },
    insights: [
      {
        title: "Fix Mandate Reconciliation",
        description: "The most severe reproduced defect occurs when the bank has approved the mandate but BlinkMoney's own status check fails, leaving the user in Mandate Pending.",
        badge: "Engineering"
      },
      {
        title: "Bank Verification is the Largest Leak",
        description: "1,192 users are lost between SIP amount selection and bank verification, representing a 52.1% stage drop.",
        badge: "Funnel"
      },
      {
        title: "Make Mandate Failures Measurable",
        description: "Without a dedicated failure event, external mandate approval and internal reconciliation failure can look identical in a funnel.",
        badge: "Instrumentation"
      },
      {
        title: "External Dependency Matters",
        description: "Not every delay represents user friction. Several key stages are confirmed by external systems, so funnel timing must distinguish product-side waiting from bank/NPCI/RTA latency.",
        badge: "Product Architecture"
      }
    ],
    recommendations: [
      {
        title: "Webhook-Driven Mandate Reconciliation",
        action: "Listen for external mandate-approval confirmations and update internal state through a reliable webhook reconciliation process instead of depending solely on client status polling.",
        expectedImpact: "Prevent externally approved mandates from remaining stuck in Mandate Pending."
      },
      {
        title: "Instrument Mandate Status Failures",
        action: "Ship mandate_status_check_failed with HTTP status, error message, retry count, and external approval state.",
        expectedImpact: "Turn an otherwise invisible reconciliation defect into a measurable engineering metric."
      },
      {
        title: "Fix or Queue Bank Fetch Rate Limiting",
        action: "Intelligently queue bank-fetch requests and provide an informative retry state instead of a hard 'Too many requests' failure.",
        expectedImpact: "Reduce the largest observed funnel leak at the bank-verification stage."
      },
      {
        title: "Build an Async Status Center",
        action: "Surface pending PAN, bank, mandate, and first-unit-credit events through a persistent status experience and push notifications.",
        expectedImpact: "Make external-system waiting understandable instead of presenting asynchronous processing as an onboarding failure."
      }
    ],
    metrics: [
      {
        label: "SAVE JOURNEY",
        value: "10 Stages",
        trend: "App Open → First Unit Credited",
        isPositive: true,
        context: "End-to-end fintech onboarding flow"
      },
      {
        label: "APP OPENS",
        value: "4,102 Users",
        trend: "Distinct Journey Entries",
        isPositive: true,
        context: "Top-of-funnel distinct users"
      },
      {
        label: "FINAL ACTIVATION",
        value: "588 Users",
        trend: "14.3% Overall Conversion",
        isPositive: true,
        context: "Users reaching First Unit Credited"
      }
    ],
    sqlSnippets: [
      {
        title: "BlinkMoney Step-over-Step Funnel Conversion in PostgreSQL",
        query: `-- Calculate stage-level reach, users lost, and step conversion in PostgreSQL
WITH first_touch AS (
  SELECT
    user_id,
    event_name,
    MIN(event_ts) AS first_event_ts
  FROM events
  GROUP BY user_id, event_name
),
stage_counts AS (
  SELECT
    event_name,
    COUNT(DISTINCT user_id) AS users_reached
  FROM first_touch
  GROUP BY event_name
),
stage_funnel AS (
  SELECT
    m.stage_order,
    m.event_name,
    m.is_external_confirmation,
    COALESCE(sc.users_reached, 0) AS users_reached
  FROM milestone_stages m
  LEFT JOIN stage_counts sc ON m.event_name = sc.event_name
)
SELECT
  stage_order,
  event_name,
  is_external_confirmation,
  users_reached,
  LAG(users_reached) OVER (ORDER BY stage_order) AS users_prev_stage,
  LAG(users_reached) OVER (ORDER BY stage_order) - users_reached AS users_lost_vs_prev,
  ROUND(
    users_reached * 100.0 / NULLIF(LAG(users_reached) OVER (ORDER BY stage_order), 0), 
    2
  ) AS step_conversion_percentage
FROM stage_funnel
ORDER BY stage_order;`,
        explanation: "Calculates stage-level user reach, previous-stage volume, absolute funnel loss, and step-over-step conversion while preserving the externally confirmed stage flag."
      }
    ],
    funnelData: [
      { step: "01. App Open", users: 4102, conversionRate: 100, dropOffRate: 0, insight: "4,102 distinct users" },
      { step: "02. Mobile Verified", users: 2974, conversionRate: 72.50, dropOffRate: 27.50, insight: "1,128 users lost" },
      { step: "03. PAN Verified", users: 2338, conversionRate: 57.00, dropOffRate: 21.39, insight: "External PAN registry dependency" },
      { step: "04. SIP Amount Selected", users: 2290, conversionRate: 55.83, dropOffRate: 2.05, insight: "High commitment intent" },
      { step: "05. Bank Verified", users: 1098, conversionRate: 26.77, dropOffRate: 52.05, insight: "Largest leak: 1,192 users lost (52.1% drop)" },
      { step: "06. Mandate Completed", users: 731, conversionRate: 17.82, dropOffRate: 33.42, insight: "Second largest drop: 367 users lost" },
      { step: "07. Details Saved", users: 688, conversionRate: 16.77, dropOffRate: 5.88, insight: "Personal & nominee details" },
      { step: "08. Consent Verified", users: 640, conversionRate: 15.60, dropOffRate: 6.98, insight: "Investment agreement signed" },
      { step: "09. SIP Created", users: 631, conversionRate: 15.38, dropOffRate: 1.41, insight: "SIP scheduled in backend" },
      { step: "10. First Unit Credited", users: 588, conversionRate: 14.33, dropOffRate: 6.81, insight: "Final activation: 588 users credited (14.3%)" }
    ],
    thumbnail: "/assets/projects/blinkmoney-preview.png",
    previewGradient: "from-emerald-950 via-slate-900 to-black",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/blinkmoney_da"
  },
  {
    id: "sql-sales-data-analytics",
    number: "08",
    title: "SQL SALES DATA ANALYTICS - SALES, PROFITABILITY & CUSTOMER INTELLIGENCE",
    category: "DATA ANALYTICS",
    year: "2026",
    featured: true,
    tagline: "Sales, Profitability & Customer Intelligence across 9.99K Records",
    shortDescription: "End-to-end sales analytics using MySQL and Power BI to evaluate $2.30M in sales, $286.40K in profit, customer behaviour, product performance, discount impact, and regional trends.",
    tools: ["MySQL", "SQL", "Power BI", "Excel", "Business Intelligence", "Git/GitHub"],
    
    problem: {
      statement: "Sales teams need a consolidated view of revenue, profitability, customer behaviour, product performance, discounting, shipping, and regional performance to identify where growth is being created and where margin is being lost.",
      context: "Analyzed 9,994 transactional sales records across 5,009 unique orders, 793 customers, 1,862 products, and 49 U.S. states spanning 2018 to 2021.",
      businessImpact: "Turn transactional sales data into decision-ready insights for product prioritization, pricing and discount review, customer targeting, regional planning, and operational decisions."
    },
    data: {
      sources: [
        "9,994 sales records across 5,009 unique orders (2018-2021 U.S. sales dataset)",
        "Key attributes: Order ID, Customer ID, Segment, Region, State, Category, Sub-Category, Sales, Quantity, Discount, Profit, Ship Mode",
        "Total Scope: $2,297,200.86 sales, $286,397.02 profit (12.47% margin)"
      ],
      volume: "9,994 sales records across 793 customers and 1,862 products",
      dimensions: ["Product Category & Sub-Category", "Customer Segment", "Geographic Region & State", "Discount Band", "Order Year"]
    },
    approach: [
      {
        step: "Data Preparation & Database Setup",
        description: "Prepared the sales dataset for MySQL analysis, established the sales-report table structure, and organized customer, product, geographic, shipping, sales, discount, and profit attributes."
      },
      {
        step: "SQL Business Analysis",
        description: "Built SQL queries covering sales trends, customer behaviour, product performance, discount impact, profitability, shipping, geography, retention, RFM, and basket analysis."
      },
      {
        step: "Power BI Decision Dashboard",
        description: "Translated SQL and dataset-level findings into interactive Power BI visuals for executive sales, customer, product, regional, and operational analysis."
      }
    ],
    analysis: {
      summary: "Evaluated $2.30M in sales and $286.40K in profit, identifying substantial margin differences between product categories and steep margin erosion above 20% discount.",
      keyFindings: [
        "Sales and profit grew to their highest levels in 2021 ($733.22K sales, $93.44K profit) from $484.25K sales and $49.54K profit in 2018.",
        "Technology generated $836.15K sales and $145.45K profit (17.40% margin); Office Supplies generated $719.05K sales and $122.49K profit (17.04% margin).",
        "Furniture generated $742.00K in sales but only $18.45K in profit, yielding a low 2.49% profit margin.",
        "West leads regional commercial performance ($725.46K sales, $108.42K profit, 14.94% margin); Central has the lowest regional margin at 7.92%.",
        "High discounts correlate with sharp margin erosion: 0-10% discount yields 28.89% margin, turning negative at 20-30% (-10.05%) and dropping to -180.03% at 70%+.",
        "Sub-category margin warnings: Tables (-$17.73K profit, -8.56% margin), Bookcases (-$3.47K profit, -3.02%) vs Copiers ($55.62K profit, 37.20% margin), Paper ($34.05K profit, 43.39%).",
        "Consumer segment generates the largest sales ($1.16M, 11.55% margin), while Home Office has the highest margin at 14.03% ($429.65K sales, $60.30K profit)."
      ]
    },
    insights: [
      {
        title: "Furniture Sales Hide a Margin Problem",
        description: "Furniture generates approximately $742K in sales but only $18.45K in profit, producing a 2.49% margin versus roughly 17% for Technology and Office Supplies.",
        badge: "Profitability"
      },
      {
        title: "High Discounts Require Margin Control",
        description: "Observed profit margin declines sharply across higher discount bands, turning negative from the 20-30% range onward.",
        badge: "Pricing"
      },
      {
        title: "West Leads Commercial Performance",
        description: "West generates the highest sales at $725.46K and highest profit at $108.42K, while Central records the lowest profit margin at 7.92%.",
        badge: "Geography"
      },
      {
        title: "High Sales Does Not Guarantee High Profit",
        description: "Several high-revenue products and sub-categories produce weak or negative profit, making product-level margin analysis essential for assortment decisions.",
        badge: "Product"
      }
    ],
    recommendations: [
      {
        title: "Review High-Discount Bands",
        action: "Audit products and campaigns operating above 20% discount and evaluate whether incremental sales volume justifies the observed margin erosion.",
        expectedImpact: "Improve discount governance and protect contribution margin."
      },
      {
        title: "Reassess Loss-Making Sub-Categories",
        action: "Review pricing, discounting, product cost, and assortment decisions for Tables, Bookcases, and Supplies.",
        expectedImpact: "Identify whether negative-margin sub-categories require repricing, tighter discount controls, or assortment adjustments."
      },
      {
        title: "Prioritize High-Margin Products",
        action: "Use sub-category and product-level profit margin alongside sales volume when prioritizing products for promotions and assortment decisions.",
        expectedImpact: "Shift decision-making from revenue-only ranking toward revenue plus profitability."
      },
      {
        title: "Investigate Central Region Margin",
        action: "Break Central-region performance down by category, sub-category, discount level, and customer segment to identify the source of the 7.92% margin.",
        expectedImpact: "Identify region-specific margin leakage and determine whether the issue is product mix or discounting."
      }
    ],
    metrics: [
      {
        label: "DATASET SCALE",
        value: "9.99K Records",
        trend: "5,009 Orders · 793 Customers",
        isPositive: true,
        context: "9,994 sales records (2018-2021)"
      },
      {
        label: "COMMERCIAL SCALE",
        value: "$2.30M Sales",
        trend: "$2,297,200.86 Total Sales",
        isPositive: true,
        context: "4-year commercial revenue"
      },
      {
        label: "PROFITABILITY",
        value: "$286.40K Profit",
        trend: "12.47% Overall Margin",
        isPositive: true,
        context: "$286,397.02 total profit"
      }
    ],
    sqlSnippets: [
      {
        title: "Profit Margin by Product Sub-Category in MySQL",
        query: `-- Calculate sales, profit, and profit margin percentage by sub-category in MySQL
SELECT
  Sub_Category,
  ROUND(SUM(Sales), 2) AS total_sales,
  ROUND(SUM(Profit), 2) AS total_profit,
  ROUND((SUM(Profit) / SUM(Sales)) * 100, 2) AS profit_margin_percentage,
  COUNT(DISTINCT Order_ID) AS total_orders,
  SUM(Quantity) AS total_units_sold
FROM sales_report
GROUP BY Sub_Category
ORDER BY profit_margin_percentage DESC;`,
        explanation: "Aggregates sales and profit at sub-category level and calculates profit margin to identify high-value and loss-making product areas."
      }
    ],
    thumbnail: "/assets/projects/sales-preview.png",
    previewGradient: "from-blue-950 via-slate-900 to-black",
    githubUrl: "https://github.com/AYUSHKUMARSAHOO04/SQL_sales_dataanalytics"
  }
];
