
/* ── SAMPLE DATA ─────────────────────────────────────── */
const RECORDS = [
  {id:'REC-001',upc:'N-010-052-1001-HR',project:'Gurugram–Faridabad Expressway',contractor:'Alpha Highway Constructions Pvt. Ltd.',piu:'PIU Gurugram',ro:'RO North Delhi',mode:'HAM',completionDate:"15 Mar'26",physicalProgress:88,testsScheduled:6,testsAccepted:6,status:'compliance-submitted',punchlistCount:'3 Items',pccIssued:'—',ccIssued:'—'},
  {id:'REC-002',upc:'N-010-052-1002-HR',project:'Ambala–Kaithal Corridor',contractor:'Beta Projects Ltd.',piu:'PIU Ambala',ro:'RO Chandigarh',mode:'EPC',completionDate:"20 Apr'26",physicalProgress:84,testsScheduled:4,testsAccepted:3,status:'test-uploaded',punchlistCount:'—',pccIssued:'—',ccIssued:'—'},
  {id:'REC-003',upc:'N-010-052-1003-HR',project:'Nagpur Ring Road Phase II',contractor:'Gamma Infra & Roads Ltd.',piu:'PIU Nagpur',ro:'RO Maharashtra',mode:'BOT',completionDate:"10 Jan'26",physicalProgress:97,testsScheduled:8,testsAccepted:8,status:'pcc-issued',punchlistCount:'2 Items',pccIssued:'12 Feb\'26',ccIssued:'—'},
  {id:'REC-004',upc:'N-010-052-1004-HR',project:'Chennai Southern Bypass',contractor:'Delta Highways Pvt. Ltd.',piu:'PIU Chennai',ro:'RO Tamil Nadu',mode:'EPC',completionDate:"30 Jun'26",physicalProgress:81,testsScheduled:0,testsAccepted:0,status:'submitted',punchlistCount:'—',pccIssued:'—',ccIssued:'—'},
  {id:'REC-005',upc:'N-010-052-1005-HR',project:'Kolkata Port Connectivity',contractor:'Epsilon Constructions Ltd.',piu:'PIU Kolkata',ro:'RO West Bengal',mode:'HAM',completionDate:"15 Aug'26",physicalProgress:80,testsScheduled:5,testsAccepted:0,status:'test-scheduled',punchlistCount:'—',pccIssued:'—',ccIssued:'—'},
  {id:'REC-006',upc:'N-010-052-1006-HR',project:'Pune–Nashik Highway Upgrade',contractor:'Zeta Road Works Ltd.',piu:'PIU Pune',ro:'RO Maharashtra',mode:'EPC',completionDate:"01 Sep'26",physicalProgress:82,testsScheduled:0,testsAccepted:0,status:'draft',punchlistCount:'—',pccIssued:'—',ccIssued:'—'},
  {id:'REC-007',upc:'N-010-052-1007-HR',project:'Jaipur–Ajmer Expressway',contractor:'Eta Construction Corp.',piu:'PIU Jaipur',ro:'RO Rajasthan',mode:'HAM',completionDate:"12 Oct'26",physicalProgress:86,testsScheduled:6,testsAccepted:6,status:'punchlist-submitted',punchlistCount:'4 Items',pccIssued:'—',ccIssued:'—'},
];

/* ── TEST DETAILS DATA (per record) ─────────────────── */
const TEST_DETAILS = {
  'REC-001': {
    requested: [
      {name:'Visual & Physical Test',basis:'HAM Sch.I',contractorNote:'Full project length; site-specific conditions noted at Ch.23+400'},
      {name:'Test Drive (Day & Night)',basis:'HAM Sch.I',contractorNote:'Both carriageways; convoy of 3 vehicles'},
      {name:'Riding Quality (NSV)',basis:'HAM Sch.I',contractorNote:'IRI target ≤ 3.5 m/km; PD/RO representative required'},
      {name:'Pavement Composition',basis:'HAM Sch.I',contractorNote:'Test pit + core cutting at ≥ 2 locations; samples kept at PD Office'},
      {name:'Structural Test — MBIU',basis:'HAM Sch.I',contractorNote:'All major bridges and grade-separated structures'},
      {name:'Environmental Audit',basis:'HAM Sch.I',contractorNote:'CRZ / forest clearance compliance verification'},
    ],
    scheduled: [
      {name:'Visual & Physical Test',chainFrom:'0.000',chainTo:'89.400',date:"28 Apr'26, 10:00am",rep:'Arun Sharma (AE)',desig:'Authority Engineer',email:'arun.sharma@nhai.gov.in',result:'Acceptable',witness:'R.K. Gupta (PIU)',actualDate:"28 Apr'26, 10:30am",remarks:'All visual checks passed. Physical measurements within tolerance.'},
      {name:'Test Drive (Day & Night)',chainFrom:'0.000',chainTo:'89.400',date:"28 Apr'26, 6:00pm",rep:'Priya Mehta (IE)',desig:'Independent Engineer',email:'priya.mehta@nhai.gov.in',result:'Acceptable',witness:'S.P. Sharma (PIU)',actualDate:"28 Apr'26, 7:15pm",remarks:'Day and night drives completed. Visibility, signage and lighting satisfactory.'},
      {name:'Riding Quality (NSV)',chainFrom:'0.000',chainTo:'89.400',date:"30 Apr'26, 9:00am",rep:'Priya Mehta (IE)',desig:'Independent Engineer',email:'priya.mehta@nhai.gov.in',result:'Acceptable',witness:'R.K. Gupta (PIU)',actualDate:"30 Apr'26, 9:15am",remarks:'IRI value 2.8 m/km — within acceptable limit of 3.5 m/km.'},
      {name:'Pavement Composition',chainFrom:'12.500',chainTo:'67.200',date:"01 May'26, 11:00am",rep:'Arun Sharma (AE)',desig:'Authority Engineer',email:'arun.sharma@nhai.gov.in',result:'Acceptable',witness:'S.P. Sharma (PIU)',actualDate:"01 May'26, 11:30am",remarks:'Core cutting at 2 locations. Pavement thickness as per design.'},
      {name:'Structural Test — MBIU',chainFrom:'23.200',chainTo:'58.700',date:"02 May'26, 8:00am",rep:'Suresh Pandey (AE)',desig:'Authority Engineer',email:'suresh.pandey@nhai.gov.in',result:'Acceptable',witness:'R.K. Gupta (PIU)',actualDate:"02 May'26, 8:30am",remarks:'All 4 major bridges inspected. No defects observed.'},
      {name:'Environmental Audit',chainFrom:'0.000',chainTo:'89.400',date:"02 May'26, 2:00pm",rep:'Arun Sharma (AE)',desig:'Authority Engineer',email:'arun.sharma@nhai.gov.in',result:'Acceptable',witness:'—',actualDate:"02 May'26, 2:45pm",remarks:'Environmental compliance verified. CRZ conditions met.'},
    ],
  },
  'REC-002': {
    requested: [
      {name:'Visual & Physical Test',basis:'EPC Sch.Q',contractorNote:'Full project length'},
      {name:'Test Drive (Day)',basis:'EPC Sch.Q',contractorNote:'Day drive; both carriageways'},
      {name:'Riding Quality (NSV)',basis:'EPC Sch.Q',contractorNote:'IRI target ≤ 3.5 m/km'},
      {name:'Pavement Composition',basis:'EPC Sch.Q',contractorNote:'Test pit + core cutting; min 2 locations'},
    ],
    scheduled: [
      {name:'Visual & Physical Test',chainFrom:'0.000',chainTo:'72.300',date:"02 May'26, 9:00am",rep:'Kavita Singh (IE)',desig:'Independent Engineer',email:'kavita.singh@nhai.gov.in',result:'Acceptable',witness:'P.K. Nair (PIU)',actualDate:"02 May'26, 9:30am",remarks:'Visual inspection passed. Some minor snag at Ch.34+200 — noted in punchlist.'},
      {name:'Test Drive (Day)',chainFrom:'0.000',chainTo:'72.300',date:"03 May'26, 8:00am",rep:'Kavita Singh (IE)',desig:'Independent Engineer',email:'kavita.singh@nhai.gov.in',result:'Acceptable',witness:'P.K. Nair (PIU)',actualDate:"03 May'26, 8:45am",remarks:'Test drive completed. Road geometry satisfactory.'},
      {name:'Riding Quality (NSV)',chainFrom:'0.000',chainTo:'72.300',date:"04 May'26, 10:00am",rep:'Kavita Singh (IE)',desig:'Independent Engineer',email:'kavita.singh@nhai.gov.in',result:'Reject & Re-Schedule',witness:'—',actualDate:"04 May'26, 10:30am",remarks:'IRI value 4.1 m/km at Ch.28+000–35+000 — exceeds limit of 3.5 m/km. Re-carpeting required.'},
      {name:'Pavement Composition',chainFrom:'15.000',chainTo:'65.000',date:"05 May'26, 9:00am",rep:'Kavita Singh (IE)',desig:'Independent Engineer',email:'kavita.singh@nhai.gov.in',result:'Pending',witness:'—',actualDate:'—',remarks:'—'},
    ],
  },
  'REC-003': {
    requested: [
      {name:'Visual & Physical Test',basis:'BOT Sch.I',contractorNote:'Full project length; includes elevated corridor'},
      {name:'Test Drive (Day & Night)',basis:'BOT Sch.I',contractorNote:'Both carriageways incl. ring road interchange'},
      {name:'Riding Quality (NSV)',basis:'BOT Sch.I',contractorNote:'IRI ≤ 3.0 m/km (expressway standard)'},
      {name:'Structural Test — MBIU',basis:'BOT Sch.I',contractorNote:'8 major bridges; 3 grade-separated structures'},
      {name:'Load Test',basis:'BOT Sch.I',contractorNote:'2 representative bridges — static and dynamic'},
      {name:'Environmental Audit',basis:'BOT Sch.I',contractorNote:'Wildlife corridor compliance'},
      {name:'Safety Audit',basis:'BOT Sch.I',contractorNote:'RSA final stage audit'},
      {name:'Retro-Reflective Test',basis:'BOT Sch.I',contractorNote:'Sign boards and road marking; night measurement'},
    ],
    scheduled: [
      {name:'Visual & Physical Test',chainFrom:'0.000',chainTo:'112.600',date:"15 Jan'26, 9:00am",rep:'Arun Sharma (AE)',desig:'Authority Engineer',email:'arun.sharma@nhai.gov.in',result:'Acceptable',witness:'M.R. Patel (PIU)',actualDate:"15 Jan'26, 9:30am",remarks:'All checks passed.'},
      {name:'Test Drive (Day & Night)',chainFrom:'0.000',chainTo:'112.600',date:"16 Jan'26, 7:00am",rep:'Priya Mehta (IE)',desig:'Independent Engineer',email:'priya.mehta@nhai.gov.in',result:'Acceptable',witness:'M.R. Patel (PIU)',actualDate:"16 Jan'26, 8:30pm",remarks:'Day and night drives satisfactory.'},
      {name:'Riding Quality (NSV)',chainFrom:'0.000',chainTo:'112.600',date:"17 Jan'26, 8:00am",rep:'Priya Mehta (IE)',desig:'Independent Engineer',email:'priya.mehta@nhai.gov.in',result:'Acceptable',witness:'M.R. Patel (PIU)',actualDate:"17 Jan'26, 8:30am",remarks:'IRI 2.4 m/km — well within limit.'},
      {name:'Structural Test — MBIU',chainFrom:'8.200',chainTo:'98.400',date:"18 Jan'26, 8:00am",rep:'Suresh Pandey (AE)',desig:'Authority Engineer',email:'suresh.pandey@nhai.gov.in',result:'Acceptable',witness:'M.R. Patel (PIU)',actualDate:"18 Jan'26, 9:00am",remarks:'All 8 bridges inspected and found satisfactory.'},
      {name:'Load Test',chainFrom:'34.500',chainTo:'67.800',date:"19 Jan'26, 9:00am",rep:'Arun Sharma (AE)',desig:'Authority Engineer',email:'arun.sharma@nhai.gov.in',result:'Acceptable',witness:'—',actualDate:"19 Jan'26, 10:30am",remarks:'Static and dynamic load tests passed.'},
      {name:'Environmental Audit',chainFrom:'0.000',chainTo:'112.600',date:"20 Jan'26, 9:00am",rep:'Suresh Pandey (AE)',desig:'Authority Engineer',email:'suresh.pandey@nhai.gov.in',result:'Acceptable',witness:'—',actualDate:"20 Jan'26, 10:00am",remarks:'Wildlife corridor conditions met.'},
      {name:'Safety Audit',chainFrom:'0.000',chainTo:'112.600',date:"20 Jan'26, 2:00pm",rep:'Priya Mehta (IE)',desig:'Independent Engineer',email:'priya.mehta@nhai.gov.in',result:'Acceptable',witness:'—',actualDate:"20 Jan'26, 3:30pm",remarks:'Stage 4 RSA completed. 3 recommendations — all addressed.'},
      {name:'Retro-Reflective Test',chainFrom:'0.000',chainTo:'112.600',date:"21 Jan'26, 8:00pm",rep:'Arun Sharma (AE)',desig:'Authority Engineer',email:'arun.sharma@nhai.gov.in',result:'Acceptable',witness:'—',actualDate:"21 Jan'26, 9:15pm",remarks:'Retro-reflectivity values meet IRC standards.'},
    ],
  },
  'default': {
    requested: [
      {name:'Visual & Physical Test',basis:'As per Mode',contractorNote:'Full project length'},
      {name:'Test Drive',basis:'As per Mode',contractorNote:'Both carriageways'},
      {name:'Riding Quality (NSV)',basis:'As per Mode',contractorNote:'IRI ≤ 3.5 m/km'},
      {name:'Pavement Composition',basis:'As per Mode',contractorNote:'Min 2 core locations'},
      {name:'Environmental Audit',basis:'As per Mode',contractorNote:'Clearance compliance'},
    ],
    scheduled: [],
  },
};

/* ── TEST DETAILS MODAL ──────────────────────────────── */
function TestDetailsModal({record, onClose}) {
  const [tab, setTab] = useState('requested');
  if (!record) return null;
  const details = TEST_DETAILS[record.id] || TEST_DETAILS['default'];
  const scheduled = details.scheduled;
  const requested = details.requested;
  const accepted = scheduled.filter(t => t.result === 'Acceptable').length;
  const rejected = scheduled.filter(t => t.result === 'Reject & Re-Schedule').length;
  const pending  = scheduled.filter(t => t.result === 'Pending').length;

  const resultBadge = (r) => {
    if (r === 'Acceptable')          return {bg:C.successBg, c:C.success, dot:C.success};
    if (r === 'Reject & Re-Schedule') return {bg:C.errorBg,   c:C.error,   dot:C.error};
    return {bg:C.surface, c:C.muted, dot:'#D9D9D9'};
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.48)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:'#fff',borderRadius:18,boxShadow:'0 12px 48px rgba(0,0,0,0.22)',width:900,maxWidth:'98%',maxHeight:'92vh',display:'flex',flexDirection:'column'}}>

        {/* Header */}
        <div style={{padding:'18px 24px 14px',borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{fontSize:11,color:C.muted,fontWeight:500,marginBottom:3}}>Test Details — {record.upc}</div>
              <div style={{fontSize:17,fontWeight:700,color:C.text}}>{record.project}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>{record.contractor} · Mode: <strong>{record.mode}</strong></div>
            </div>
            <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex',marginTop:2}}>
              <Ic d={P.close} s={18} c={C.muted} str sw={1.5}/>
            </button>
          </div>

          {/* Summary stats */}
          <div style={{display:'flex',gap:12,marginTop:14,flexWrap:'wrap'}}>
            {[
              {label:'Tests Requested',value:requested.length,color:C.primaryDark,bg:'#E8F0F8'},
              {label:'Tests Scheduled',value:scheduled.length,color:C.primary,bg:'#EEF4FF'},
              {label:'Accepted',value:accepted,color:C.success,bg:C.successBg},
              {label:'Reject & Re-Schedule',value:rejected,color:C.error,bg:C.errorBg},
              {label:'Pending',value:pending,color:C.warning,bg:C.warningBg},
            ].map((s,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 14px',borderRadius:100,background:s.bg}}>
                <span style={{fontSize:20,fontWeight:800,color:s.color,lineHeight:1}}>{s.value}</span>
                <span style={{fontSize:11,fontWeight:600,color:s.color,opacity:0.85}}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',borderBottom:`1px solid ${C.border}`,paddingLeft:8,flexShrink:0}}>
          {[['requested','Tests Requested by Contractor'],['scheduled','Scheduled & Results (AE/IE)']].map(([id,label])=>(
            <div key={id} onClick={()=>setTab(id)} style={{padding:'11px 18px',fontSize:13,fontWeight:tab===id?700:500,color:tab===id?C.primaryDark:C.tabInactive,cursor:'pointer',position:'relative',whiteSpace:'nowrap'}}>
              {label}
              {tab===id&&<div style={{position:'absolute',bottom:-1,left:0,right:0,height:2,background:C.primaryDark,borderRadius:'2px 2px 0 0'}}/>}
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}}>

          {/* REQUESTED TAB */}
          {tab==='requested'&&(
            <div>
              <div style={{fontSize:12,color:C.muted,marginBottom:14,padding:'8px 14px',background:'#FFF8E1',borderRadius:8,lineHeight:1.5}}>
                <strong>Note:</strong> Tests listed are as per Checklist-7 (AE/IE finalised). Contractor has requested these tests as part of the Test Schedule Request. AE/IE schedules them after reviewing CL-7 & CL-8.
              </div>
              <div style={{border:`1px solid ${C.border}`,borderRadius:12,overflow:'hidden'}}>
                <div style={{display:'grid',gridTemplateColumns:'36px 1fr 140px 1fr',background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                  {['S.No','Test Name','Schedule Reference','Contractor Note / Scope'].map((h,i)=>(
                    <div key={i} style={{padding:'9px 14px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>
                  ))}
                </div>
                {requested.map((t,ri)=>(
                  <div key={ri} style={{display:'grid',gridTemplateColumns:'36px 1fr 140px 1fr',borderBottom:ri<requested.length-1?`1px solid ${C.divider}`:'none',transition:'background 0.1s'}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{padding:'12px 14px',fontSize:12,color:C.muted,fontWeight:500,display:'flex',alignItems:'flex-start'}}>{ri+1}</div>
                    <div style={{padding:'12px 14px',display:'flex',alignItems:'flex-start',gap:10}}>
                      <div style={{width:28,height:28,borderRadius:8,background:C.surface,border:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                        <Ic d={P.check} s={13} c={C.primary} str sw={2}/>
                      </div>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:C.text,lineHeight:1.3}}>{t.name}</div>
                        <div style={{fontSize:11,color:C.muted,marginTop:1}}>
                          {scheduled.find(s=>s.name===t.name)
                            ? <span style={{color:C.success,fontWeight:600}}>✓ Scheduled by AE/IE</span>
                            : <span style={{color:C.warning,fontWeight:600}}>⏳ Awaiting scheduling</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{padding:'12px 14px',display:'flex',alignItems:'flex-start'}}>
                      <span style={{fontSize:11,fontWeight:600,padding:'3px 8px',borderRadius:100,background:'#EEF4FF',color:C.primaryDark}}>{t.basis}</span>
                    </div>
                    <div style={{padding:'12px 14px',fontSize:12,fontWeight:400,color:C.muted,display:'flex',alignItems:'flex-start',lineHeight:1.5}}>{t.contractorNote}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCHEDULED TAB */}
          {tab==='scheduled'&&(
            <div>
              {scheduled.length===0?(
                <div style={{padding:'48px',textAlign:'center',color:C.muted}}>
                  <Ic d={P.clock} s={32} c={C.border} str/>
                  <div style={{fontSize:14,fontWeight:600,color:C.muted,marginTop:12}}>No tests scheduled yet</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:4}}>AE/IE will schedule tests after approving CL-7 & CL-8.</div>
                </div>
              ):(
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {scheduled.map((t,ri)=>{
                    const rb = resultBadge(t.result);
                    return (
                      <div key={ri} style={{border:`1px solid ${C.border}`,borderRadius:12,overflow:'hidden'}}>
                        {/* Card top band */}
                        <div style={{height:3,background:t.result==='Acceptable'?C.success:t.result==='Reject & Re-Schedule'?C.error:C.border}}/>
                        <div style={{padding:'14px 18px'}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                            <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                              <div style={{width:34,height:34,borderRadius:10,background:rb.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                                <Ic d={t.result==='Acceptable'?P.check:t.result==='Reject & Re-Schedule'?P.close:P.clock} s={16} c={rb.c} str sw={2.5}/>
                              </div>
                              <div>
                                <div style={{fontSize:14,fontWeight:700,color:C.text}}>{t.name}</div>
                                <div style={{fontSize:12,color:C.muted,marginTop:2}}>Ch. {t.chainFrom} – {t.chainTo} km</div>
                              </div>
                            </div>
                            <span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 10px',borderRadius:100,background:rb.bg,color:rb.c,fontSize:12,fontWeight:600,whiteSpace:'nowrap'}}>
                              <span style={{width:7,height:7,borderRadius:'50%',background:rb.dot,flexShrink:0}}/>
                              {t.result}
                            </span>
                          </div>
                          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px 16px'}}>
                            {[
                              ['Scheduled Date & Time', t.date],
                              ['Actual Test Date & Time', t.actualDate],
                              ['AE/IE Representative', t.rep],
                              ['Designation', t.desig],
                              ['Witness Authority (PIU)', t.witness],
                              ['Email', t.email],
                            ].map(([l,v],i)=>(
                              <div key={i}>
                                <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:2}}>{l}</div>
                                <div style={{fontSize:12,fontWeight:600,color:C.text}}>{v||'—'}</div>
                              </div>
                            ))}
                          </div>
                          {t.remarks&&t.remarks!=='—'&&(
                            <div style={{marginTop:10,padding:'8px 12px',background:C.surface,borderRadius:8,fontSize:12,color:C.muted,lineHeight:1.5}}>
                              <strong style={{color:C.text}}>Remarks:</strong> {t.remarks}
                            </div>
                          )}
                          <div style={{display:'flex',gap:8,marginTop:12}}>
                            <button style={{fontSize:11,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'3px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}><Ic d={P.doc} s={12} c={C.primaryDark} str sw={1.5}/>View Report</button>
                            <button style={{fontSize:11,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'3px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}><Ic d={P.eye} s={12} c={C.primaryDark} str sw={1.5}/>Photos</button>
                            <button style={{fontSize:11,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'3px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}><Ic d={P.download} s={12} c={C.primaryDark} str sw={1.5}/>Download</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{padding:'12px 24px',borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'flex-end',gap:10,flexShrink:0}}>
          <button onClick={onClose} style={{background:C.primary,color:'#fff',border:'none',borderRadius:100,height:36,padding:'0 20px',fontSize:13,fontWeight:500,cursor:'pointer'}}>Close</button>
        </div>
      </div>
    </div>
  );
}

function getActions(status,role) {
  if(role!=='AE/IE') return [];
  const map={
    'submitted':     [{id:'checklist',label:'1. Checklist Items'}],
    'cl-approved':   [{id:'test-schedule',label:'2. Schedule for Test'}],
    'ae-cl-submitted':[{id:'test-schedule',label:'2. Schedule for Test'}],
    'test-scheduled':   [{id:'upload-reports',label:'3. Upload Test Report'},{id:'reschedule',label:'4. Reschedule Tests'}],
    'test-rescheduled': [{id:'upload-reports',label:'3. Upload Test Report'},{id:'reschedule',label:'4. Reschedule Tests'}],
    'test-uploaded':    [{id:'issue-pcc',label:'5. Issue Provisional Completion Certificate'},{id:'punchlist',label:'6. Add Punch List Item'},{id:'reschedule',label:'4. Reschedule Tests (Rejected)'}],
    'pcod-requested':[{id:'punchlist',label:'6. Add Punch List Item'}],
    'punchlist-submitted':[{id:'punchlist',label:'6. Add Punch List Item'}],
    'ro-observation':[{id:'punchlist',label:'6. Add Punch List Item'}],
    'compliance-submitted':[{id:'issue-pcc',label:'5. Issue Provisional Completion Certificate'}],
    'pcc-issued':    [{id:'punchlist',label:'Update Punchlist Status'}],
  };
  return map[status]||[];
}

/* ── LANDING GRID ────────────────────────────────────── */
function GridScreen({role,onNavigate}) {
  const [search,setSearch]=useState('');
  const [entries,setEntries]=useState('10');
  const [viewModal,setViewModal]=useState(null);
  const [testDetailRec, setTestDetailRec] = useState(null);
  const tw = window.TWEAKS || {};
  const density = tw.density || 'standard';
  const gridStyle = tw.gridStyle || 'table';
  const kpiPad = {compact:'12px 20px',standard:'20px 28px',spacious:'28px 36px'}[density];
  const rowPad = {compact:'8px 12px',standard:'14px 12px',spacious:'20px 12px'}[density];

  const filtered=RECORDS.filter(r=>
    r.project.toLowerCase().includes(search.toLowerCase())||
    r.upc.toLowerCase().includes(search.toLowerCase())||
    r.contractor.toLowerCase().includes(search.toLowerCase())
  );

  const statStr=(s)=>{
    const m={
      'draft':'Draft',
      'submitted':'Checklist Submitted by Contractor',
      'cl-approved':'Checklist Approved',
      'test-scheduled':'Test Scheduled by AE/IE',
      'test-uploaded':'Test Reports Uploaded by AE/IE',
      'pcod-requested':'PCOD Requested',
      'punchlist-submitted':'Punch List Added by AE/IE',
      'ro-observation':'RO Site Visit Report Uploaded',
      'compliance-submitted':'Compliance Updated on RO Site Visit',
      'compliance-pending':'Compliance Pending',
      'pcc-issued':'Provisional Completion Certificate Issued by AE/IE',
      'punchlist-closed':'Punchlist Closed',
    };
    return m[s]||s;
  };

  return (
    <div style={{padding:'28px 32px',flex:1,overflowY:'auto'}}>
      {/* KPI Bar */}
      <div style={{background:C.navy,borderRadius:14,padding:kpiPad,marginBottom:24,display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:0}}>
        {[
          {label:'Total Projects',value:RECORDS.length,icon:P.shield},
          {label:'In Progress',value:RECORDS.filter(r=>!['pcc-issued','punchlist-closed','draft'].includes(r.status)).length,icon:P.clock||P.alert},
          {label:'PCC Issued',value:RECORDS.filter(r=>r.status==='pcc-issued').length,icon:P.check},
          {label:'Tests Scheduled',value:RECORDS.reduce((a,r)=>a+r.testsScheduled,0),icon:P.list},
          {label:'Tests Accepted',value:RECORDS.reduce((a,r)=>a+r.testsAccepted,0),icon:P.sign},
        ].map((k,i)=>(
          <div key={i} style={{padding:'0 20px',borderRight:i<4?'1px solid rgba(255,255,255,0.12)':'none',display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:38,height:38,borderRadius:10,background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <Ic d={k.icon} s={18} c='rgba(255,255,255,0.8)' str/>
            </div>
            <div>
              <div style={{fontSize:24,fontWeight:700,color:'#fff',lineHeight:1.1}}>{k.value}</div>
              <div style={{fontSize:11,fontWeight:500,color:'rgba(255,255,255,0.6)',marginTop:2,letterSpacing:'-0.005em'}}>{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,gap:12,flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{fontSize:16,fontWeight:700,color:C.text,letterSpacing:'-0.005em'}}>PCC / PCOD Records</div>
          <span style={{fontSize:12,fontWeight:500,color:C.muted,background:C.surface,padding:'2px 8px',borderRadius:100,border:`1px solid ${C.border}`}}>{filtered.length} records</span>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,background:'#fff',border:`1px solid ${C.border}`,borderRadius:8,padding:'0 12px',height:36,minWidth:240,boxShadow:'0 1px 2px rgba(0,0,0,0.06)'}}>
            <Ic d={P.search} s={14} c={C.muted} str sw={1.5}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search project, UPC, contractor…" style={{border:'none',outline:'none',fontSize:13,fontWeight:400,color:C.text,background:'transparent',flex:1}}/>
          </div>
          <Btn v='outlined' sz='sm' icon={<Ic d={P.filter} s={13} c={C.primaryDark} str sw={2}/>}>Filter</Btn>
          <Btn v='outlined' sz='sm' icon={<Ic d={P.download} s={13} c={C.primaryDark} str sw={2}/>}>Export</Btn>
          {(role==='Contractor') && (
            <Btn sz='sm' icon={<Ic d={P.plus} s={13} c='#fff' str sw={2.5}/>} onClick={()=>onNavigate('create')}>
              NEW +
            </Btn>
          )}
        </div>
      </div>

      {/* CARD VIEW */}
      {gridStyle==='cards'&&(
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:16,marginBottom:20}}>
          {filtered.map((row,ri)=>{
            const actions=getActions(row.status,role);
            const statStr=(s)=>({
              'draft':'Draft','submitted':'Checklist Submitted','cl-approved':'Checklist Approved',
              'test-scheduled':'Test Scheduled','test-uploaded':'Test Report Uploaded',
              'pcod-requested':'PCOD Requested','punchlist-submitted':'Punchlist Submitted',
              'ro-observation':'Observation Shared','compliance-submitted':'Compliance Submitted',
              'pcc-issued':'PCC Issued','punchlist-closed':'Punchlist Closed',
            }[s]||s);
            return (
              <div key={row.id} style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,boxShadow:'0 2px 8px rgba(0,0,0,0.07)',overflow:'hidden',display:'flex',flexDirection:'column',transition:'box-shadow 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(3,78,162,0.12)'}
                onMouseLeave={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.07)'}>
                {/* Card header stripe */}
                <div style={{height:4,background:`linear-gradient(90deg,${C.primary},${C.primaryMuted})`}}/>
                <div style={{padding:'16px 18px',flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                    <div style={{flex:1,paddingRight:10}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.text,lineHeight:1.3,marginBottom:3}}>{row.project}</div>
                      <div style={{fontSize:11,fontWeight:600,color:C.primaryDark,letterSpacing:'-0.005em'}}>{row.upc}</div>
                    </div>
                    <span style={{fontSize:11,padding:'3px 10px',borderRadius:100,background:row.mode==='HAM'?'#E8F0F8':row.mode==='BOT'?'#F0F4FF':'#F5F8FC',color:row.mode==='HAM'?C.primary:row.mode==='BOT'?'#5C6BC0':C.muted,fontWeight:700,flexShrink:0}}>{row.mode}</span>
                  </div>
                  <div style={{marginBottom:10}}><Badge status={row.status} label={statStr(row.status)}/></div>
                  <div style={{fontSize:11,color:C.muted,marginBottom:3}}>{row.contractor}</div>
                  <div style={{fontSize:11,color:'#9FB5CE',marginBottom:12}}>{row.piu} · {row.ro}</div>
                  {/* Progress bar */}
                  <div style={{marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                      <span style={{fontSize:11,fontWeight:500,color:C.muted}}>Physical Progress</span>
                      <span style={{fontSize:11,fontWeight:700,color:row.physicalProgress>=90?C.success:C.primary}}>{row.physicalProgress}%</span>
                    </div>
                    <div style={{height:5,borderRadius:100,background:C.surface,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${row.physicalProgress}%`,background:`linear-gradient(90deg,${C.primary},${C.success})`,borderRadius:100,transition:'width 0.4s'}}/>
                    </div>
                  </div>
                  {/* Stats row */}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
                    {[['Tests Sch.',row.testsScheduled],['Tests Acc.',row.testsAccepted],['Punchlist',row.punchlistCount==='—'?0:parseInt(row.punchlistCount)||0]].map(([l,v],i)=>(
                      <div key={i} style={{textAlign:'center',padding:'7px 4px',background:C.surface,borderRadius:8}}>
                        <div style={{fontSize:16,fontWeight:700,color:i===1&&v>0?C.success:C.text}}>{v}</div>
                        <div style={{fontSize:10,color:C.muted,fontWeight:500}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>Completion: <strong>{row.completionDate}</strong></div>
                </div>
                {/* Card footer */}
                <div style={{padding:'10px 18px',borderTop:`1px solid ${C.divider}`,display:'flex',justifyContent:'space-between',alignItems:'center',background:C.surface}}>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>onNavigate('view-submission',row)} style={{fontSize:11,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'3px 8px',cursor:'pointer'}}>View</button>
                    <button onClick={()=>onNavigate('activity-log',row)} style={{fontSize:11,color:C.muted,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'3px 8px',cursor:'pointer'}}>Log</button>
                  </div>
                  {role==='AE/IE'&&actions.length>0?(
                    <DropMenu options={actions} onSelect={(id)=>onNavigate(id,row)}/>
                  ):role==='Contractor'&&row.status==='draft'?(
                    <Btn v='outlined' sz='sm' onClick={()=>onNavigate('checklist',row)}>Continue</Btn>
                  ):role==='Contractor'&&['test-uploaded','pcod-requested'].includes(row.status)?(
                    <Btn v='outlined' sz='sm' onClick={()=>onNavigate('pcod-request',row)}>PCOD Request</Btn>
                  ):(role==='PIU'||role==='PD'||role==='Contractor')&&row.status==='ro-observation'?(
                    <Btn v='outlined' sz='sm' onClick={()=>onNavigate('compliance',row)}>Compliance</Btn>
                  ):role==='RO'&&['punchlist-submitted','pcod-requested'].includes(row.status)?(
                    <Btn sz='sm' onClick={()=>onNavigate('ro-site-visit',row)}>Site Visit</Btn>
                  ):null}
                </div>
              </div>
            );
          })}
          {role==='Contractor'&&(
            <div onClick={()=>onNavigate('create')} style={{background:'#fff',borderRadius:14,border:`2px dashed ${C.border}`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,padding:32,cursor:'pointer',transition:'border-color 0.15s,background 0.15s',minHeight:200}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.primary;e.currentTarget.style.background=C.surface;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background='#fff';}}>
              <div style={{width:40,height:40,borderRadius:'50%',background:C.surface,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.plus} s={20} c={C.primary} str sw={2}/></div>
              <div style={{fontSize:13,fontWeight:600,color:C.primaryDark}}>New Request</div>
              <div style={{fontSize:11,color:C.muted}}>Create Test Schedule Request</div>
            </div>
          )}
        </div>
      )}

      {/* TABLE VIEW */}
      {gridStyle!=='cards'&&<div style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,overflow:'hidden',boxShadow:'0 2px 4px rgba(0,0,0,0.06)'}}>
        {/* Table Header */}
        <div style={{display:'grid',gridTemplateColumns:'40px minmax(90px,0.7fr) minmax(160px,1.3fr) minmax(85px,0.9fr) minmax(60px,0.7fr) minmax(45px,0.6fr) minmax(45px,0.6fr) minmax(45px,0.6fr) minmax(60px,0.7fr) minmax(60px,0.7fr) minmax(60px,0.7fr) minmax(60px,0.7fr)',background:C.surface,borderBottom:`1px solid ${C.border}`,position:'sticky',top:0}}>
          {['S.No','UPC','Project / Contractor','Status','Mode','Sch.','Acc.','Detail','PCC','List','Views','Action'].map((h,i)=>(
            <div key={i} style={{padding:'10px 9px',fontSize:11,fontWeight:600,color:C.muted,letterSpacing:'-0.005em',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{h}</div>
          ))}
        </div>
        {filtered.map((row,ri)=>{
          const actions=getActions(row.status,role);
          return (
            <div key={row.id} style={{display:'grid',gridTemplateColumns:'40px minmax(90px,0.7fr) minmax(160px,1.3fr) minmax(85px,0.9fr) minmax(60px,0.7fr) minmax(45px,0.6fr) minmax(45px,0.6fr) minmax(45px,0.6fr) minmax(60px,0.7fr) minmax(60px,0.7fr) minmax(60px,0.7fr) minmax(60px,0.7fr)',borderBottom:ri<filtered.length-1?`1px solid ${C.border}`:'none',transition:'background 0.1s'}}
              onMouseEnter={e=>e.currentTarget.style.background=C.surface}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{padding:rowPad,fontSize:12,color:C.muted,fontWeight:500,display:'flex',alignItems:'center'}}>{ri+1}</div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',minWidth:0}}>
                <span style={{fontSize:11,fontWeight:600,color:C.primaryDark,overflow:'hidden',textOverflow:'ellipsis'}}>{row.upc}</span>
              </div>
              <div style={{padding:rowPad,display:'flex',flexDirection:'column',justifyContent:'center',gap:2,minWidth:0}}>
                <span style={{fontSize:12,fontWeight:600,color:C.text,lineHeight:1.3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{row.project}</span>
                <span style={{fontSize:11,fontWeight:500,color:C.muted,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{row.contractor}</span>
                <span style={{fontSize:10,fontWeight:500,color:'#9FB5CE',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{row.piu} · {row.ro}</span>
              </div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',minWidth:0}}>
                <Badge status={row.status} label={statStr(row.status)}/>
              </div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center'}}>
                <span style={{fontSize:11,padding:'2px 8px',borderRadius:100,background:row.mode==='HAM'?'#E8F0F8':row.mode==='BOT'?'#F0F4FF':'#F5F8FC',color:row.mode==='HAM'?C.primary:row.mode==='BOT'?'#5C6BC0':C.muted,fontWeight:600}}>{row.mode}</span>
              </div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',fontSize:12,fontWeight:600,color:C.text,justifyContent:'center'}}>{row.testsScheduled}</div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',fontSize:12,fontWeight:600,color:row.testsAccepted>0?C.success:C.muted,justifyContent:'center'}}>{row.testsAccepted}</div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',justifyContent:'center'}}>
                {row.testsScheduled>0?<button onClick={()=>setTestDetailRec(row)} style={{fontSize:11,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'2px 8px',cursor:'pointer',whiteSpace:'nowrap'}}>View</button>:<span style={{fontSize:11,color:C.muted}}>—</span>}
              </div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',justifyContent:'center'}}>
                {row.pccIssued!=='—'?<button style={{fontSize:11,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'2px 8px',cursor:'pointer',whiteSpace:'nowrap'}}>DL</button>:<span style={{fontSize:11,color:C.muted}}>—</span>}
              </div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',justifyContent:'center'}}>
                {row.punchlistCount!=='—'?<button onClick={()=>onNavigate('punchlist',row)} style={{fontSize:11,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'2px 8px',cursor:'pointer'}}>{row.punchlistCount}</button>:<span style={{fontSize:11,color:C.muted}}>—</span>}
              </div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',gap:3,justifyContent:'center'}}>
                <button onClick={()=>onNavigate('view-submission',row)} style={{fontSize:10,color:C.primaryDark,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'2px 6px',cursor:'pointer',whiteSpace:'nowrap'}}>Sub</button>
                <button onClick={()=>onNavigate('activity-log',row)} style={{fontSize:10,color:C.muted,fontWeight:500,background:'none',border:`1px solid ${C.border}`,borderRadius:100,padding:'2px 6px',cursor:'pointer',whiteSpace:'nowrap'}}>Log</button>
              </div>
              <div style={{padding:rowPad,display:'flex',alignItems:'center',justifyContent:'center'}}>
                {role==='AE/IE'&&actions.length>0?(
                  <DropMenu options={actions} onSelect={(id)=>onNavigate(id,row)}/>
                ):role==='RO'&&['punchlist-submitted','pcod-requested'].includes(row.status)?(
                  <Btn sz='sm' onClick={()=>onNavigate('ro-site-visit',row)}>Visit</Btn>
                ):role==='Contractor'&&row.status==='draft'?(
                  <Btn v='outlined' sz='sm' onClick={()=>onNavigate('checklist',row)}>Go</Btn>
                ):role==='Contractor'&&['test-uploaded','pcod-requested'].includes(row.status)?(
                  <Btn v='outlined' sz='sm' onClick={()=>onNavigate('pcod-request',row)}>PCOD</Btn>
                ):(role==='PIU'||role==='PD'||role==='Contractor')&&row.status==='ro-observation'?(
                  <Btn v='outlined' sz='sm' onClick={()=>onNavigate('compliance',row)}>Comp</Btn>
                ):(
                  <span style={{fontSize:11,color:C.muted}}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>}

      {/* Footer */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14,padding:'0 4px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,fontSize:13,color:C.muted}}>
          Show
          <select value={entries} onChange={e=>setEntries(e.target.value)} style={{border:`1px solid ${C.border}`,borderRadius:6,padding:'4px 8px',fontSize:12,color:C.text,outline:'none'}}>
            {['10','25','50'].map(v=><option key={v}>{v}</option>)}
          </select>
          entries
        </div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          {['‹','1','2','›'].map((p,i)=>(
            <button key={i} style={{width:30,height:30,borderRadius:6,border:`1px solid ${C.border}`,background:p==='1'?C.primary:'#fff',color:p==='1'?'#fff':C.muted,fontSize:13,fontWeight:500,cursor:'pointer'}}>{p}</button>
          ))}
        </div>
      </div>
      {/* Test Details Modal */}
      <TestDetailsModal record={testDetailRec} onClose={()=>setTestDetailRec(null)}/>
    </div>
  );
}

/* ── CREATE TEST SCHEDULE REQUEST ─────────────────────── */
function CreateRequestScreen({onBack,onNavigate}) {
  const [form,setForm]=useState({
    projectName:'Gurugram–Faridabad Expressway',
    mode:'HAM',completionDate:"15 Mar'26",
    totalLength:'89.4',physicalProgress:'88',
    pcodLength:'',reason:'',likelyDate:'',
    requestLetter:'',undertaking:'',droneVideo:'',remarks:''
  });
  const [tests,setTests]=useState([{id:1,description:'',startChainage:'',endChainage:'',reasonNonCompl:'',likelyDate:''}]);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const addTest=()=>setTests(t=>[...t,{id:Date.now(),description:'',startChainage:'',endChainage:'',reasonNonCompl:'',likelyDate:''}]);
  const delTest=(id)=>setTests(t=>t.filter(x=>x.id!==id));
  const updTest=(id,k,v)=>setTests(t=>t.map(x=>x.id===id?{...x,[k]:v}:x));
  const [submitted,setSubmitted]=useState(false);

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Ic d={P.check} s={28} c={C.success} str sw={2.5}/>
      </div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>Test Schedule Request Submitted</div>
      <div style={{fontSize:14,color:C.muted,textAlign:'center',maxWidth:420}}>Your request has been submitted successfully. AE/IE will review the checklist items.</div>
      <div style={{display:'flex',gap:12,marginTop:8}}>
        <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
        <Btn onClick={()=>onNavigate('checklist',RECORDS[0])}>Fill Checklist Items</Btn>
      </div>
    </div>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:2}}>Commissioning › PCC / PCOD</div>
          <div style={{fontSize:20,fontWeight:700,color:C.text}}>Create Test Schedule Request</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:20,maxWidth:1100}}>
        <div>
          {/* Auto-fetched fields */}
          <SectionBox title="Project Information (Auto-fetched)">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <FormField label="Project Name" value={form.projectName} readOnly/>
              <FormField label="Mode (Contract Type)" value={form.mode} readOnly/>
              <FormField label="Scheduled / Likely Completion Date" value={form.completionDate} readOnly/>
              <FormField label="Total Project Length (km)" value={form.totalLength} readOnly/>
              <FormField label="Physical Progress (%)" value={form.physicalProgress} readOnly hint={Number(form.physicalProgress)>=80?'✓ Meets threshold (≥80%)':'⚠ Below 80% — PCC cannot be initiated'}/>
            </div>
          </SectionBox>

          {/* Editable fields */}
          <SectionBox title="Request Details">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <FormField label="PCOD Project Length (km)" required value={form.pcodLength} onChange={v=>set('pcodLength',v)} placeholder="Must be ≤ Total Project Length"/>
              {Number(form.physicalProgress)<100&&(
                <FormField label="Reason for Non-Provisional Completion" required={Number(form.physicalProgress)<100} value={form.reason} onChange={v=>set('reason',v)} type="textarea" rows={2}/>
              )}
              <FormField label="Likely Date of Provisional Completion" type="date" value={form.likelyDate} onChange={v=>set('likelyDate',v)}/>
              <FormField label="Remarks" type="textarea" rows={2} value={form.remarks} onChange={v=>set('remarks',v)} placeholder="Optional, max 500 characters"/>
            </div>
          </SectionBox>

          {/* Tests to be Conducted */}
          <SectionBox title="Tests to be Conducted">
            <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:16}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 100px 100px 1fr 150px 36px',gap:0,background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                {['Description (Max 500 chars)','Start Chainage','End Chainage','Reason for Non Completion','Likely Date of Completion',''].map((h,i)=>(
                  <div key={i} style={{padding:'10px 12px',fontSize:11,fontWeight:600,color:C.muted,wordBreak:'break-word'}}>{h}</div>
                ))}
              </div>
              {tests.map((test,ti)=>(
                <div key={test.id} style={{display:'grid',gridTemplateColumns:'1fr 100px 100px 1fr 150px 36px',borderBottom:ti<tests.length-1?`1px solid ${C.divider}`:'none'}}>
                  <div style={{padding:'8px 12px',borderRight:`1px solid ${C.divider}`}}>
                    <textarea value={test.description} onChange={e=>updTest(test.id,'description',e.target.value)} placeholder="e.g., Visual & Physical Test" rows={2} style={{width:'100%',border:'none',padding:'6px 4px',fontSize:12,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  </div>
                  <div style={{padding:'8px 12px',borderRight:`1px solid ${C.divider}`}}>
                    <input value={test.startChainage} onChange={e=>updTest(test.id,'startChainage',e.target.value)} placeholder="1+100" style={{width:'100%',border:'none',padding:'8px 4px',fontSize:12,outline:'none',background:'transparent'}}/>
                  </div>
                  <div style={{padding:'8px 12px',borderRight:`1px solid ${C.divider}`}}>
                    <input value={test.endChainage} onChange={e=>updTest(test.id,'endChainage',e.target.value)} placeholder="1+200" style={{width:'100%',border:'none',padding:'8px 4px',fontSize:12,outline:'none',background:'transparent'}}/>
                  </div>
                  <div style={{padding:'8px 12px',borderRight:`1px solid ${C.divider}`}}>
                    <textarea value={test.reasonNonCompl} onChange={e=>updTest(test.id,'reasonNonCompl',e.target.value)} placeholder="Optional reason for non-completion" rows={2} style={{width:'100%',border:'none',padding:'6px 4px',fontSize:12,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  </div>
                  <div style={{padding:'8px 12px',borderRight:`1px solid ${C.divider}`}}>
                    <input type="date" value={test.likelyDate} onChange={e=>updTest(test.id,'likelyDate',e.target.value)} style={{width:'100%',border:'none',padding:'4px 4px',fontSize:12,outline:'none',background:'transparent'}}/>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'4px'}}>
                    <button onClick={()=>delTest(test.id)} style={{background:'none',border:'none',cursor:'pointer',display:'flex'}}><Ic d={P.trash} s={14} c={C.error} str sw={1.5}/></button>
                  </div>
                </div>
              ))}
              <div style={{padding:'10px 12px',borderTop:`1px solid ${C.border}`}}>
                <Btn v='ghost' sz='sm' onClick={addTest} icon={<Ic d={P.plus} s={12} c={C.primaryDark} str sw={2.5}/>}>Add Test</Btn>
              </div>
            </div>
          </SectionBox>

          {/* Documents */}
          <SectionBox title="Document Uploads">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <FormField label="Upload Request Letter" type="file" required value={form.requestLetter} onChange={v=>set('requestLetter',v)}/>
              <FormField label="Undertaking of Achievement of Physical Progress" type="file" required value={form.undertaking} onChange={v=>set('undertaking',v)}/>
              <FormField label="Upload Drone Video (Optional)" type="file" value={form.droneVideo} onChange={v=>set('droneVideo',v)} hint="MP4 format only"/>
            </div>
          </SectionBox>
        </div>

        {/* Right panel */}
        <div>
          <div style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,padding:20,position:'sticky',top:16}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:16}}>Submission Checklist</div>
            {[
              {done:!!form.pcodLength,label:'PCOD Project Length entered'},
              {done:!!form.requestLetter,label:'Request Letter uploaded'},
              {done:!!form.undertaking,label:'Undertaking uploaded'},
              {done:Number(form.physicalProgress)>=80,label:'Physical progress ≥ 80%'},
            ].map((item,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:i<3?`1px solid ${C.divider}`:'none'}}>
                <div style={{width:20,height:20,borderRadius:'50%',background:item.done?C.successBg:'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <Ic d={P.check} s={11} c={item.done?C.success:'#ddd'} str sw={2.5}/>
                </div>
                <span style={{fontSize:13,fontWeight:500,color:item.done?C.text:C.muted}}>{item.label}</span>
              </div>
            ))}
            <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:10}}>
              <Btn style={{width:'100%',justifyContent:'center'}} onClick={()=>setSubmitted(true)}>Submit Request</Btn>
              <Btn v='outlined' style={{width:'100%',justifyContent:'center'}}>Save as Draft</Btn>
              <Btn v='text' style={{width:'100%',justifyContent:'center'}} onClick={onBack}>Cancel</Btn>
            </div>
            <div style={{marginTop:16,padding:'10px 12px',background:'#FFF8E1',borderRadius:8,fontSize:11,color:'#E65100',lineHeight:1.4}}>
              <strong>Note:</strong> If Mode = Item Rate, the system will route directly to CC process. All PCC, Punchlist, and PCOD steps will be bypassed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CHECKLIST SCREEN (Contractor CL1-6 + AE/IE CL1-8) ─── */
const CL_TABS_CONTRACTOR=['Checklist-1','Checklist-2','Checklist-3','Checklist-4','Checklist-5','Checklist-6'];
const CL_TABS_AEIE=['Checklist-1','Checklist-2','Checklist-3','Checklist-4','Checklist-5','Checklist-6','Checklist-7','Checklist-8'];

const CL_META = {
  'Checklist-1': {
    title:'Highway & Structure Inventory',
    sections:[
      {name:'Section A: Carriageway as per Schedule B', rows:['Main Carriageway Width','Earthen Shoulder Width','Cross Fall of MCW & Shoulder','Maximum Superelevation','Tapering of Carriageway','Finished Road Level (FRL)','Toe Wall Provision']},
      {name:'Section B: Grade Separated Structure Approach', rows:['Width of Carriageway','Paved Carriageway','Approach with Free Slope / RPCC Wall','RPCC Crash Barrier','Acceleration / Deceleration Lane Length']},
      {name:'Section C: Design Speed (Schedule B)', rows:['Minimum Radius Provided','Speed Limit Section','Deviation as per Schedule D']},
      {name:'Section D: Median (Schedule B)', rows:['Width of Median','Plantation','Anti-glare Measure','Crash Barrier at Median','Tapering of Median','Median Drainage']},
    ]
  },
  'Checklist-2': {
    title:'Junctions, Pavement, Sight Distance, Median Openings, Service Roads',
    sections:[
      {name:'Section A: Development of Junction (IRC SP 84 / SP 87)', rows:['Acceleration / Deceleration Lane','Setback Distance','Cross Road Connectivity & Pavement Condition','Signage, Road Marking, Studs, Islands','Lighting Provision']},
      {name:'Section B: Pavement & Sight Distance', rows:['Type of Pavement (Flexible / Rigid)','Pavement Thickness','Sight Distance (Summit Curve)','Sight Distance (Valley Curve Night)']},
      {name:'Section C: Median Opening', rows:['Location (Schedule-B)','Length of Median Opening','Shelter Lane','Road Signage / Marking / Studs','Detachable Barrier','Parapet Arrangement']},
      {name:'Section D: Service / Slip Road', rows:['Width & Continuity of Service Road','Entry / Exit from Main Carriageway','Footpath','Pedestrian Guard Rail','Attenuator at Slip Road','Signages']},
    ]
  },
  'Checklist-3': {
    title:'Structural Compliance',
    sections:[
      {name:'Section A: RE Wall (per location as per design / Schedule B)', rows:['Height of RE Wall up to top of FRL','Crash Barrier with Friction Slab above RE Wall','Bulging of RE Wall','Cracks in RE Wall Panel','Protection Beam in RE Wall']},
      {name:'Section B: Culverts / Cross Drainage Structures', rows:['Span arrangement / Vent Size','Width of structure','Crash barrier not obstructing traffic','Protection work','Waterway cleaning']},
      {name:'Section C: Minor and Major Bridge', rows:['Type, span arrangement, length and skew angle','Width of carriageway','Settlement in Approach Slab','Bearing','Expansion Joint','Drainage Spout and connectivity','Wearing coat']},
      {name:'Section D: Grade Separated Structures', rows:['Span arrangement and length','Vertical Clearance','Width of carriageway','Bearing','Expansion Joint','Approach lighting','Cracks / honeycombing / other defects']},
      {name:'Section E: ROB / RUB (as per Schedule B)', rows:['Span arrangement and length','Vertical Clearance','Width of carriageway','Settlement in Approach Slab','Wearing coat','Railway ROW clearance']},
    ]
  },
  'Checklist-4': {
    title:'Toll Plaza, Truck Laybys, Bus Bays, Street Lighting, MBCB',
    sections:[
      {name:'Section A: Toll Plaza (as per Schedule C)', rows:['Type of Pavement (start to end of taper)','Number of Toll Lanes','Width of regular Toll Lanes','Toll Booth, Ventilation, AC in all Toll Booths','Crash Barrier on both sides','TMS System','Approach Lighting and High Mast','Toilet Facility with disposal system','Drainage system','Firefighting system with fire alarm']},
      {name:'Section B: Truck Laybys (as per Schedule C)', rows:['Location and Length and tapering','Pavement Crust','Rest Area with toilets and waste disposal','Drinking water','Lighting up to 50m beyond start and end']},
      {name:'Section C: Bus Bays (as per Schedule C)', rows:['Location and Length and tapering','Bus shelter with sitting arrangement','Pedestrian crossing with footpath at median','Lighting from start to end of taper','Plantation of shady tree']},
      {name:'Section D: Street Lighting (as per Schedule C)', rows:['Built-up areas','Approach of grade separated structure','Lux Level (to be checked at night)','Solar Lighting','Lighting poles painted black & white strip']},
      {name:'Section E: MBCB Location (as per Schedule C)', rows:['Median','Embankment height > 3m','At curve location up to 450m radius','Height: 730±25mm (W Beam)','Post spacing 2m in general','End terminals at start/end of MBCB']},
    ]
  },
  'Checklist-5': {
    title:'Road Signs, Hazard Markers, Drainage, Slope Protection, Road Marking',
    sections:[
      {name:'Section A: Road Signs (IRC 67-2023)', rows:['Number of signs as per design / approved signage plan','Size of signage as per Design Speed','Sign board color (Mandatory, Warning, Information)','Visibility of signs day and night','Chevron sign at outer side of curve','QR Code with indelible ink at back of signboard','All sign boards/gantry galvanized']},
      {name:'Section B: Hazard Marker', rows:['Roadside hazard marked with Hazard Marker','Slanting Yellow & Black strip towards carriageway','Hazard Marker immediately ahead of obstruction']},
      {name:'Section C: Roadside Drainage', rows:['Availability of drainage system along highway','Depth of drainage as per design','Flow direction','Connection of roadside drainage with cross drainage','Median drain at superelevation']},
      {name:'Section D: Rainwater Harvesting', rows:['Spacing','Connection to drainage system']},
      {name:'Section E: Slope Protection', rows:['Slope protection type for height < 3m, 3m-6m, > 6m','Chutes spacing, size and design','Energy dissipation basin','Channel Kerb along embankment for height > 3m']},
      {name:'Section F: Road Marking', rows:['Edge Line marking and width','Lane marking width and spacing','Arrow marking','Chevron at gore area','Pedestrian crossing marking','Raised profile edge line']},
    ]
  },
  'Checklist-6': {
    title:'Road Studs, Kerb/RPCC, Rest Area, Plantation, Utilities & Safety Facilities',
    sections:[
      {name:'Section A: Road Studs', rows:['Studs color: yellow (median), red (outer edge), white (lane)','Studs not over marking','Bi-directional road studs at chevron','Solar studs at highly hazardous areas']},
      {name:'Section B: Road Kerb and RPCC Crash Barrier', rows:['Location of Kerb & Crash barriers','Painting: black and white strip on road kerb','Yellow continuous painting on hazardous area']},
      {name:'Section C-D: Rest Area & Plantation', rows:['Boundary wall','Development of area','Spacing of plantation','Types of plant','Geotagging of plants']},
      {name:'Section E-J: Utilities & Systems', rows:['Utility Duct and Utility Corridor','Shifting of Utilities as per Contract provisions','Highway Patrol','Crane Service, Capacity of crane','Ambulance','Advanced Traffic Management Systems (ATMS)']},
      {name:'Section K-O: Infrastructure', rows:['Operation and Maintenance Centre','Boundary Wall / ROW Pillar','5th KM / KM / Hecto Stone','Pedestrian Guard Rail','First Aid Facility']},
    ]
  },
};

const CL7_ROWS=[
  'Comparison of Schedule B & C vs executed at site; deviations mentioned; RO/PD verify on random basis',
  'Physical Test and Visual Test: report with recommendation letter; RO/PD verify 1% and 5%',
  'NSV Survey (Riding Quality): PD/RO representative mandatory during survey and data processing',
  'Pavement Composition (Test Pit and Core Cutting): RO/PD present; ≥ 2 samples; kept at PD Office',
  'Cross Section Test',
  'Mobile Bridge Investigation Unit (MBIU)',
  'Ultrasonic Pulse Velocity Test',
  'Load Test',
  'Rebound Hammer Test',
  'Retro Reflective Test on Sign Board and Marking',
  'Drone Videography',
  'Environmental Audit',
  'Safety Audit',
  'Test Drive — Day time',
  'Test Drive — Night time',
];

const CL8_ROWS=[
  'Status of COS: all negative COS and descoping approved (HAM: Art.16 / EPC: Art.13)',
  'EOT and Milestone: status vs contract; LD and recovery decision before PCC',
  'Compliance of environmental, forest, wildlife, CRZ clearance and Railway approval',
  'Compliance of court orders (District/Session/High Court/Supreme Court/NGT)',
  'NCR: all NCRs issued during construction are closed',
  'Warranty Certificate — Bearing',
  'Warranty Certificate — RE Wall',
  'Warranty Certificate — Expansion Joint',
  'Warranty Certificate — Cable Strands',
  'Warranty Certificate — Retro-Reflective Sheeting/Lettering',
  'Warranty Certificate — Instrumentation',
  'Warranty Certificate — RE/RS/Gabion Wall Support System',
  'Warranty Certificate — Any Other Proprietary Item',
  'As-built design: PD (5% of length or 5km max)',
  'As-built design: RO (1% of length or 1km max)',
  'Bank Guarantee — Performance Bank Guarantee',
  'Bank Guarantee — Additional Performance Bank Guarantee (if any)',
  'Bank Guarantee for releasing Retention Money (if applicable)',
  'Maintenance Manual',
  'Status of de-scoped work',
  'Procurement details of all electrical connections',
];

function ChecklistScreen({record,role,onBack,onNavigate}) {
  const isAE=role==='AE/IE';
  const tabs=isAE?CL_TABS_AEIE:CL_TABS_CONTRACTOR;
  const [activeTab,setActiveTab]=useState(tabs[0]);
  const [data,setData]=useState({});
  const [rejectModal,setRejectModal]=useState(false);
  const [rejectComment,setRejectComment]=useState('');
  const [accepted,setAccepted]=useState(false);
  const [rejected,setRejected]=useState(false);
  const [submitted,setSubmitted]=useState(false);

  const setCell=(tab,row,field,val)=>setData(d=>({...d,[`${tab}-${row}-${field}`]:val}));
  const getCell=(tab,row,field)=>data[`${tab}-${row}-${field}`]||'';

  const clMeta=CL_META[activeTab];
  const tabIndex=tabs.indexOf(activeTab);
  const isLast=tabIndex===tabs.length-1;
  const isLastContractorTab=activeTab==='Checklist-6';
  const contractorCanSubmit=!isAE&&isLastContractorTab;
  const aeCanAccept=isAE&&activeTab==='Checklist-6';

  const renderChecklistTable=(meta)=>(
    meta&&meta.sections.map((sec,si)=>(
      <SectionBox key={si} title={sec.name}>
        {/* Column headers */}
        <div style={{display:'grid',gridTemplateColumns:'2fr 2fr 2fr 2fr',gap:0,background:C.surface,borderRadius:8,marginBottom:8}}>
          {['Particular','Provision as per Contract Agreement','As per Site','Remarks / Comment'].map((h,hi)=>(
            <div key={hi} style={{padding:'7px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>
          ))}
        </div>
        {sec.rows.map((row,ri)=>(
          <div key={ri} style={{display:'grid',gridTemplateColumns:'2fr 2fr 2fr 2fr',gap:0,borderBottom:ri<sec.rows.length-1?`1px solid ${C.divider}`:'none',padding:'4px 0'}}>
            <div style={{padding:'8px 12px',fontSize:13,fontWeight:500,color:C.text}}>{row}</div>
            <div style={{padding:'4px 8px'}}>
              <input value={getCell(activeTab,row,'provision')} onChange={e=>setCell(activeTab,row,'provision',e.target.value)}
                readOnly={isAE}
                style={{width:'100%',border:`1px solid ${isAE?C.surface:C.border}`,borderRadius:4,padding:'6px 10px',fontSize:13,fontWeight:400,color:C.text,background:isAE?C.surface:'#fff',outline:'none',boxSizing:'border-box'}}
                placeholder={isAE?'—':'Enter value'}/>
            </div>
            <div style={{padding:'4px 8px'}}>
              <input value={getCell(activeTab,row,'site')} onChange={e=>setCell(activeTab,row,'site',e.target.value)}
                readOnly={!isAE}
                style={{width:'100%',border:`1px solid ${!isAE?C.surface:C.border}`,borderRadius:4,padding:'6px 10px',fontSize:13,fontWeight:400,color:C.text,background:!isAE?C.surface:'#fff',outline:'none',boxSizing:'border-box'}}
                placeholder={isAE?'Enter site value':'—'}/>
            </div>
            <div style={{padding:'4px 8px'}}>
              <input value={getCell(activeTab,row,'remarks')} onChange={e=>setCell(activeTab,row,'remarks',e.target.value)}
                readOnly={!isAE}
                style={{width:'100%',border:`1px solid ${!isAE?C.surface:C.border}`,borderRadius:4,padding:'6px 10px',fontSize:13,fontWeight:400,color:C.text,background:!isAE?C.surface:'#fff',outline:'none',boxSizing:'border-box'}}
                placeholder={isAE?'Add remark':'—'}/>
            </div>
          </div>
        ))}
      </SectionBox>
    ))
  );

  const renderCL7=()=>(
    <SectionBox title="Test on Provisional Completion — Required Tests">
      <div style={{fontSize:12,color:C.muted,marginBottom:12,padding:'8px 12px',background:'#FFF8E1',borderRadius:8}}>
        <strong>Note:</strong> Tests listed above are indicative. AE/IE shall finalize tests required for issuance of PCC/PCOD as per the specifications / Contract Agreement.
      </div>
      <div style={{display:'grid',gridTemplateColumns:'40px 1fr 120px 1fr',gap:0,background:C.surface,borderRadius:8,marginBottom:8}}>
        {['S.No','Description','Status (Yes/No)','Comment'].map((h,hi)=>(
          <div key={hi} style={{padding:'7px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>
        ))}
      </div>
      {CL7_ROWS.map((row,ri)=>(
        <div key={ri} style={{display:'grid',gridTemplateColumns:'40px 1fr 120px 1fr',borderBottom:ri<CL7_ROWS.length-1?`1px solid ${C.divider}`:'none',padding:'6px 0'}}>
          <div style={{padding:'8px 12px',fontSize:12,fontWeight:500,color:C.muted}}>{ri+1}</div>
          <div style={{padding:'8px 12px',fontSize:13,fontWeight:500,color:C.text}}>{row}</div>
          <div style={{padding:'4px 8px'}}>
            <div style={{display:'flex',gap:12}}>
              {['Yes','No'].map(opt=>(
                <label key={opt} style={{display:'flex',alignItems:'center',gap:4,cursor:'pointer',fontSize:13,fontWeight:500,color:C.text}}>
                  <input type="radio" name={`cl7-${ri}`} value={opt}
                    checked={getCell('CL7',row,'status')===opt}
                    onChange={()=>setCell('CL7',row,'status',opt)}
                    style={{accentColor:C.primary}}/>
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={{padding:'4px 8px'}}>
            <input value={getCell('CL7',row,'comment')} onChange={e=>setCell('CL7',row,'comment',e.target.value)}
              style={{width:'100%',border:`1px solid ${C.border}`,borderRadius:4,padding:'6px 10px',fontSize:13,outline:'none',boxSizing:'border-box'}}
              placeholder="Optional comment"/>
          </div>
        </div>
      ))}
    </SectionBox>
  );

  const renderCL8=()=>(
    <SectionBox title="Compliance, Documentation & Bank Guarantee">
      <div style={{fontSize:12,color:C.muted,marginBottom:12,padding:'8px 12px',background:'#FFF8E1',borderRadius:8}}>
        <strong>Note:</strong> AE/IE in consultation with PD/RO shall decide the necessity of above documents before issue of PCC/PCOD.
      </div>
      <div style={{display:'grid',gridTemplateColumns:'40px 2fr 120px 1fr',gap:0,background:C.surface,borderRadius:8,marginBottom:8}}>
        {['S.No','Description','Status (Yes/No)','Comment'].map((h,hi)=>(
          <div key={hi} style={{padding:'7px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>
        ))}
      </div>
      {CL8_ROWS.map((row,ri)=>(
        <div key={ri} style={{display:'grid',gridTemplateColumns:'40px 2fr 120px 1fr',borderBottom:ri<CL8_ROWS.length-1?`1px solid ${C.divider}`:'none',padding:'6px 0'}}>
          <div style={{padding:'8px 12px',fontSize:12,fontWeight:500,color:C.muted}}>{ri+1}</div>
          <div style={{padding:'8px 12px',fontSize:13,fontWeight:500,color:C.text}}>{row}</div>
          <div style={{padding:'4px 8px'}}>
            <div style={{display:'flex',gap:12}}>
              {['Yes','No'].map(opt=>(
                <label key={opt} style={{display:'flex',alignItems:'center',gap:4,cursor:'pointer',fontSize:13,fontWeight:500,color:C.text}}>
                  <input type="radio" name={`cl8-${ri}`} value={opt}
                    checked={getCell('CL8',row,'status')===opt}
                    onChange={()=>setCell('CL8',row,'status',opt)}
                    style={{accentColor:C.primary}}/>
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={{padding:'4px 8px'}}>
            <input value={getCell('CL8',row,'comment')} onChange={e=>setCell('CL8',row,'comment',e.target.value)}
              style={{width:'100%',border:`1px solid ${C.border}`,borderRadius:4,padding:'6px 10px',fontSize:13,outline:'none',boxSizing:'border-box'}}
              placeholder="Optional comment"/>
          </div>
        </div>
      ))}
    </SectionBox>
  );

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Ic d={P.check} s={28} c={C.success} str sw={2.5}/>
      </div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>{isAE?'AE/IE Checklist Submitted':'Checklist Submitted Successfully'}</div>
      <div style={{fontSize:14,color:C.muted}}>Status updated. {isAE?'Proceed to Schedule for Test.':'AE/IE will review your submission.'}</div>
      <div style={{display:'flex',gap:12,marginTop:8}}>
        <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
        {isAE&&<Btn onClick={()=>onNavigate('test-schedule',record)}>Schedule for Test</Btn>}
      </div>
    </div>
  );
  if(accepted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>Checklist Accepted</div>
      <div style={{fontSize:14,color:C.muted}}>Proceed to fill AE/IE Checklists (CL-7 & CL-8).</div>
      <div style={{display:'flex',gap:12,marginTop:8}}>
        <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
        <Btn onClick={()=>setAccepted(false)||setActiveTab('Checklist-7')}>Fill CL-7 & CL-8</Btn>
      </div>
    </div>
  );
  if(rejected) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.errorBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.close} s={28} c={C.error} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>Checklist Rejected</div>
      <div style={{fontSize:14,color:C.muted}}>Contractor has been notified to resubmit.</div>
      <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
    </div>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {record?.project}</div>
            <div style={{fontSize:18,fontWeight:700,color:C.text}}>Annexure-A Checklist Items</div>
          </div>
        </div>
        <div style={{display:'flex',gap:10}}>
          {isAE&&<Btn v='danger' sz='sm' onClick={()=>setRejectModal(true)}>Reject</Btn>}
          <Btn v='outlined' sz='sm'>Save as Draft</Btn>
        </div>
      </div>

      {/* Record info bar */}
      <div style={{background:'#fff',borderRadius:10,border:`1px solid ${C.border}`,padding:'10px 20px',marginBottom:16,display:'flex',gap:32,flexWrap:'wrap'}}>
        {[['UPC',record?.upc||'N-010-052-1001-HR'],['Project',record?.project||'—'],['Contractor',record?.contractor||'—'],['Mode',record?.mode||'HAM'],['Status',record?.status||'submitted']].map(([l,v],i)=>(
          <div key={i}>
            <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:2}}>{l}</div>
            {l==='Status'?<Badge status={v}/>:<div style={{fontSize:13,fontWeight:600,color:C.text}}>{v}</div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{borderRadius:'12px 12px 0 0',overflow:'hidden'}}>
        <Tabs items={tabs} active={activeTab} onChange={t=>setActiveTab(t)}/>
      </div>

      {/* Tab content */}
      <div style={{background:'#fff',border:`1px solid ${C.border}`,borderTop:'none',borderRadius:'0 0 12px 12px',padding:20,minHeight:400}}>
        {clMeta&&(
          <div style={{marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:700,color:C.primaryDark,marginBottom:4}}>Checklist {activeTab.replace('Checklist-','')} — {clMeta.title}</div>
            <div style={{fontSize:12,color:C.muted}}>
              {isAE?'Review Contractor entries. Fill "As per Site" and "Remarks" columns. N/A is a valid input.':'Fill "Provision as per Contract Agreement" column. N/A is a valid input.'}
            </div>
          </div>
        )}
        {activeTab==='Checklist-7'?renderCL7():activeTab==='Checklist-8'?renderCL8():renderChecklistTable(clMeta)}
      </div>

      {/* Footer nav */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:16}}>
        <Btn v='outlined' disabled={tabIndex===0} onClick={()=>setActiveTab(tabs[tabIndex-1])}>← Previous</Btn>
        <span style={{fontSize:12,color:C.muted}}>Tab {tabIndex+1} of {tabs.length}</span>
        <div style={{display:'flex',gap:10}}>
          {isAE&&aeCanAccept&&(
            <Btn v='ghost' onClick={()=>setAccepted(true)}>Accept CL 1-6</Btn>
          )}
          {((!isAE&&contractorCanSubmit)||(isAE&&activeTab==='Checklist-8'))&&(
            <Btn onClick={()=>setSubmitted(true)}>Sign & Submit</Btn>
          )}
          {!isLast&&(
            <Btn onClick={()=>setActiveTab(tabs[tabIndex+1])}>Next →</Btn>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      <Modal open={rejectModal} onClose={()=>setRejectModal(false)} title="Reject Checklist"
        footer={<>
          <Btn v='outlined' onClick={()=>setRejectModal(false)}>Cancel</Btn>
          <Btn v='danger' onClick={()=>{setRejectModal(false);setRejected(true);}}>Confirm Rejection</Btn>
        </>}>
        <div style={{marginBottom:16,padding:'10px 14px',background:C.errorBg,borderRadius:8,fontSize:13,color:C.error}}>
          The Contractor will be notified and can edit and resubmit the checklist.
        </div>
        <FormField label="Rejection Comment" type="textarea" required rows={4} value={rejectComment} onChange={setRejectComment} placeholder="Specify the reason for rejection…"/>
        <div style={{fontSize:11,color:C.muted,marginTop:4,textAlign:'right'}}>{500-rejectComment.length} characters remaining</div>
      </Modal>
    </div>
  );
}

Object.assign(window,{GridScreen,CreateRequestScreen,ChecklistScreen,RECORDS});
