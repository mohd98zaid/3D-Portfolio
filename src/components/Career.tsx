import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>TCS - Healthcare</h4>
                <h5>GenAI Architect &amp; Team Lead</h5>
              </div>
              <h3>2022 - NOW</h3>
            </div>
            <ul className="career-desc">
              <li>Architected AI apps auto-generating business logic from code flows, cutting analysis time by ~50%.</li>
              <li>Designed production RAG pipelines with FAISS vector stores and Claude AI.</li>
              <li>Built legacy Java reverse engineering tools with AST parsing, reducing documentation effort by 60%.</li>
              <li>Developed Figma-to-React pipelines achieving 80%+ design system compliance.</li>
              <li>Led a multi-agent PR review system on LangGraph.</li>
            </ul>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>TCS - BFSI</h4>
                <h5>Capital Markets Trade Surveillance · KDB+/q</h5>
              </div>
              <h3>2021 - 2022</h3>
            </div>
            <ul className="career-desc">
              <li>Optimised real-time trade surveillance monitoring FICC trades for misconduct under FCA and MAR frameworks.</li>
              <li>Maintained SDL/SDP pipelines in KDB+/q for high-throughput, low-latency tick data ingestion.</li>
              <li>Streamlined time-series analytics for capital market operations.</li>
            </ul>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>TCS - Aviation</h4>
                <h5>Database Mgmt &amp; Optimisation · SQL · Linux</h5>
              </div>
              <h3>2021</h3>
            </div>
            <ul className="career-desc">
              <li>Managed and optimised relational databases for complex aviation operations.</li>
              <li>Built SQL-based ETL pipelines with advanced indexing and partitioning strategies.</li>
              <li>Powered analytics-ready dashboards for operational intelligence.</li>
            </ul>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Dweepi Infotech</h4>
                <h5>Intern - Systems &amp; Data</h5>
              </div>
              <h3>2019</h3>
            </div>
            <ul className="career-desc">
              <li>Contributed to Linux kernel internals, including device driver development and interrupt handling.</li>
              <li>Optimised system memory management and performed system-level debugging.</li>
              <li>Collaborated with senior engineers on code review and testing of kernel patches.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
