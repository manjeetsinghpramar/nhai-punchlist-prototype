
/* ── TEST SCHEDULING SCREEN ──────────────────────────── */
function TestScheduleScreen({record,role,onBack,onNavigate,mode:screenMode='schedule'}) {
  const rec=record||RECORDS[1];
  // Post-result reschedule: rejected tests passed via rec.rejectedTests
  const isPostResult=screenMode==='reschedule'&&rec.rejectedTests&&rec.rejectedTests.length>0;

  const [rows,setRows]=useState(()=>{
    if(isPostResult){
      return rec.rejectedTests.map((t,i)=>({
        id:t.id||i+1, testName:t.testName,
        chainFrom:t.chainFrom||'0.000', chainTo:t.chainTo||'89.400',
        date:'', rep:t.rep||'', desig:t.desig||'', email:t.email||'',
      }));
    }
    return [{id:1,testName:'Visual & Physical Test',chainFrom:'0.000',chainTo:'89.400',date:'',rep:'',desig:'',email:''}];
  });
  const [schedLetter,setSchedLetter]=useState('');
  const [consentLetter,setConsentLetter]=useState('');
  const [submitted,setSubmitted]=useState(false);

  const addRow=()=>setRows(r=>[...r,{id:Date.now(),testName:'',chainFrom:'',chainTo:'',date:'',rep:'',desig:'',email:''}]);
  const delRow=(id)=>setRows(r=>r.filter(x=>x.id!==id));
  const upd=(id,k,v)=>setRows(r=>r.map(x=>x.id===id?{...x,[k]:v}:x));

  const TEST_NAMES=['Visual & Physical Test','Test Drive','Riding Quality Test','Pavement Composition Test','Cross-Section Test','Structural Test for Bridges','Environmental Audit','Safety Review','Other Tests'];
  const REPS=['Arun Sharma (AE)','Priya Mehta (IE)','Suresh Pandey (AE)','Kavita Singh (IE)'];

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>{isPostResult?'Re-Schedule Submitted':'Test Schedule Submitted'}</div>
      <div style={{fontSize:14,color:C.muted}}>
        {isPostResult
          ?<>Rejected tests rescheduled. Status: <strong>Test Rescheduled</strong>. Upload new test reports when results are available.</>
          :<>Status: <strong>Test Scheduled</strong>. Upload Test Reports when results are available.</>}
      </div>
      <div style={{display:'flex',gap:12}}><Btn v='outlined' onClick={onBack}>Back to Grid</Btn><Btn onClick={()=>onNavigate('upload-reports',rec)}>Upload Test Reports</Btn></div>
    </div>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>{screenMode==='reschedule'?'Re-Schedule For Test':'Schedule for Test'}</div>
        </div>
      </div>

      {/* Post-result reschedule banner */}
      {isPostResult&&(
        <div style={{background:C.warningBg,border:`1px solid ${C.warning}`,borderRadius:8,padding:'10px 16px',marginBottom:16,display:'flex',alignItems:'flex-start',gap:10}}>
          <Ic d={P.alert} s={16} c={C.warning} str sw={2}/>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:C.warning,marginBottom:2}}>Re-scheduling rejected tests only</div>
            <div style={{fontSize:12,color:C.muted}}>Tests with Acceptable results are locked and retained. Only the {rec.rejectedTests.length} rejected test(s) below require new scheduling.</div>
          </div>
        </div>
      )}

      {/* Pre-result reschedule: show previous letter as viewable */}
      {screenMode==='reschedule'&&!isPostResult&&(
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px',background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,marginBottom:16,alignSelf:'flex-start',width:'fit-content'}}>
          <Ic d={P.doc} s={15} c={C.muted} str sw={1.5}/>
          <span style={{fontSize:12,color:C.muted,fontWeight:500}}>Previous_Test_Schedule_Letter.pdf</span>
          <Ic d={P.eye} s={14} c={C.primaryDark} str sw={1.5}/>
          <Ic d={P.download} s={14} c={C.primaryDark} str sw={1.5}/>
        </div>
      )}
      {/* Post-result reschedule: previous letter chip */}
      {isPostResult&&(
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px',background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,marginBottom:16,alignSelf:'flex-start',width:'fit-content'}}>
          <Ic d={P.doc} s={15} c={C.muted} str sw={1.5}/>
          <span style={{fontSize:12,color:C.muted,fontWeight:500}}>Previous_Test_Schedule_Letter.pdf (for reference)</span>
          <Ic d={P.eye} s={14} c={C.primaryDark} str sw={1.5}/>
          <Ic d={P.download} s={14} c={C.primaryDark} str sw={1.5}/>
        </div>
      )}

      {/* Auto-fetched header */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,padding:'16px 20px',marginBottom:20,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px 24px'}}>
        {[['Project Name',rec.project],['Mode',rec.mode],['Scheduled / Likely Completion Date',rec.completionDate],['Total Project Length (km)',rec.totalLength||'89.4'],['Physical Progress (%)',rec.physicalProgress+'%'],['Total PCOD Project Length (km)',rec.pcodLength||'89.4']].map(([l,v],i)=>(
          <div key={i}><div style={{fontSize:11,color:C.muted,fontWeight:500,marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:C.text,background:C.surface,padding:'6px 10px',borderRadius:4}}>{v||'—'}</div></div>
        ))}
      </div>

      {/* Test rows */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:20}}>
        <div style={{padding:'12px 16px',background:C.surface,borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:13,fontWeight:700,color:C.primaryDark}}>
            {isPostResult?`Rejected Tests — Re-Schedule (${rows.length} test${rows.length!==1?'s':''})` :'Test Schedule Rows'}
          </span>
          {!isPostResult&&<Btn sz='sm' v='ghost' onClick={addRow} icon={<Ic d={P.plus} s={13} c={C.primaryDark} str sw={2.5}/>}>Add Row</Btn>}
        </div>
        {/* Column headers */}
        <div style={{display:'grid',gridTemplateColumns:`180px 90px 90px 150px 160px 130px 1fr${isPostResult?'':' 44px'}`,background:'#fafafa',borderBottom:`1px solid ${C.border}`}}>
          {['Test Name','Chain. From (km)','Chain. To (km)','New Schedule Date & Time','Representative','Designation','Email Id',...(isPostResult?[]:[''])].map((h,i)=>(
            <div key={i} style={{padding:'8px 10px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>
          ))}
        </div>
        {rows.map((row,ri)=>(
          <div key={row.id} style={{display:'grid',gridTemplateColumns:`180px 90px 90px 150px 160px 130px 1fr${isPostResult?'':' 44px'}`,borderBottom:ri<rows.length-1?`1px solid ${C.divider}`:'none'}}>
            {[
              // Test Name: read-only in post-result, dropdown otherwise
              isPostResult
                ?<div style={{padding:'10px',fontSize:13,fontWeight:600,color:C.text,background:'#FAFAFA'}}>{row.testName}</div>
                :<select value={row.testName} onChange={e=>upd(row.id,'testName',e.target.value)} style={{width:'100%',border:'none',padding:'10px',fontSize:13,outline:'none',background:'transparent'}}>
                  <option value="">— Select —</option>
                  {TEST_NAMES.map(t=><option key={t}>{t}</option>)}
                </select>,
              <input value={row.chainFrom} onChange={e=>upd(row.id,'chainFrom',e.target.value)} style={{width:'100%',border:'none',padding:'10px',fontSize:13,outline:'none',background:'transparent'}} placeholder="0.000"/>,
              <input value={row.chainTo} onChange={e=>upd(row.id,'chainTo',e.target.value)} style={{width:'100%',border:'none',padding:'10px',fontSize:13,outline:'none',background:'transparent'}} placeholder="89.400"/>,
              <input type="datetime-local" value={row.date} onChange={e=>upd(row.id,'date',e.target.value)} style={{width:'100%',border:'none',padding:'10px',fontSize:12,outline:'none',background:'transparent'}}/>,
              <select value={row.rep} onChange={e=>{upd(row.id,'rep',e.target.value);upd(row.id,'desig','Authority Engineer');upd(row.id,'email',e.target.value.toLowerCase().replace(/\s/g,'.').replace(/[()]/g,'')+'@nhai.gov.in');}} style={{width:'100%',border:'none',padding:'10px',fontSize:13,outline:'none',background:'transparent'}}>
                <option value="">— Select —</option>
                {REPS.map(r=><option key={r}>{r}</option>)}
              </select>,
              <input value={row.desig} readOnly style={{width:'100%',border:'none',padding:'10px',fontSize:13,outline:'none',background:C.surface,color:C.muted}}/>,
              <input value={row.email} readOnly style={{width:'100%',border:'none',padding:'10px',fontSize:12,outline:'none',background:C.surface,color:C.muted}}/>,
              ...(!isPostResult?[<button onClick={()=>delRow(row.id)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',padding:8}}><Ic d={P.trash} s={15} c={C.error} str sw={1.5}/></button>]:[]),
            ].map((cell,ci)=>(<div key={ci} style={{borderRight:ci<(isPostResult?6:7)?`1px solid ${C.divider}`:'none'}}>{cell}</div>))}
          </div>
        ))}
      </div>

      {/* Document uploads */}
      <SectionBox title={isPostResult?'Upload New Test Schedule Letter (Required)':'Document Uploads'}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <FormField label={isPostResult?'Upload New Test Schedule Letter':'Upload Test Schedule Letter'} type="file" required value={schedLetter} onChange={setSchedLetter}/>
          <FormField label="Upload Consent Letter of Contractor" type="file" required value={consentLetter} onChange={setConsentLetter}/>
        </div>
      </SectionBox>

      <div style={{display:'flex',gap:12,justifyContent:'flex-end',marginTop:16}}>
        <Btn v='text' onClick={onBack}>Cancel</Btn>
        <Btn v='outlined'>Save</Btn>
        <Btn icon={<Ic d={P.sign} s={15} c='#fff' str sw={2}/>} onClick={()=>setSubmitted(true)}>Sign & Submit</Btn>
      </div>
    </div>
  );
}

/* ── UPLOAD TEST REPORTS ─────────────────────────────── */
function UploadTestReportsScreen({record,onBack,onNavigate}) {
  const rec=record||RECORDS[1];
  const [reports,setReports]=useState([
    {id:1,testName:'Visual & Physical Test',chainFrom:'0.000',chainTo:'89.400',schedDate:"28 Apr'26, 10:00am",rep:'Arun Sharma (AE)',desig:'Authority Engineer',witness:'',actualDate:'',reportFile:'',photos:'',result:'',remarks:''},
    {id:2,testName:'Riding Quality Test',chainFrom:'0.000',chainTo:'89.400',schedDate:"30 Apr'26, 9:00am",rep:'Priya Mehta (IE)',desig:'Independent Engineer',witness:'',actualDate:'',reportFile:'',photos:'',result:'',remarks:''},
    {id:3,testName:'Environmental Audit',chainFrom:'0.000',chainTo:'89.400',schedDate:"28 Apr'26, 10:00am",rep:'Suresh Pandey (AE)',desig:'Authority Engineer',witness:'',actualDate:'',reportFile:'',photos:'',result:'',remarks:''},
  ]);
  const [submitted,setSubmitted]=useState(false);
  const [rejectedTests,setRejectedTests]=useState([]);
  const upd=(id,k,v)=>setReports(r=>r.map(x=>x.id===id?{...x,[k]:v}:x));

  const handleSubmit=()=>{
    const rejected=reports.filter(r=>r.result==='Reject & Re-Schedule');
    setRejectedTests(rejected);
    setSubmitted(true);
  };

  if(submitted){
    const hasRejected=rejectedTests.length>0;
    return (
      <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
        <div style={{width:64,height:64,borderRadius:'50%',background:hasRejected?C.warningBg:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ic d={hasRejected?P.alert:P.check} s={28} c={hasRejected?C.warning:C.success} str sw={2.5}/>
        </div>
        <div style={{fontSize:20,fontWeight:700,color:C.text}}>
          {hasRejected?'Test Reports Uploaded — Re-Schedule Required':'Test Reports Uploaded Successfully'}
        </div>
        <div style={{fontSize:14,color:C.muted,textAlign:'center',maxWidth:480}}>
          {hasRejected
            ?`${rejectedTests.length} test(s) marked "Reject & Re-Schedule". Schedule new dates for rejected tests before proceeding.`
            :'All test results Acceptable. Proceed to Issue PCC or add Punchlist items.'}
        </div>
        {hasRejected&&(
          <div style={{background:C.warningBg,border:`1px solid ${C.warning}`,borderRadius:8,padding:'12px 20px',minWidth:340}}>
            <div style={{fontSize:12,fontWeight:600,color:C.warning,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>Tests requiring re-scheduling:</div>
            {rejectedTests.map(t=>(
              <div key={t.id} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:C.text,marginBottom:4}}>
                <Ic d={P.alert} s={13} c={C.warning} str sw={2}/>
                <span style={{fontWeight:600}}>{t.testName}</span>
                <span style={{fontSize:11,color:C.muted}}>Ch. {t.chainFrom}–{t.chainTo}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{display:'flex',gap:12}}>
          <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
          {hasRejected
            ?<Btn icon={<Ic d={P.refresh} s={15} c='#fff' str sw={2}/>} onClick={()=>onNavigate('reschedule',{...rec,rejectedTests})}>Reschedule Rejected Tests</Btn>
            :<Btn onClick={()=>onNavigate('issue-pcc',rec)}>Issue PCC</Btn>
          }
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>Upload Test Reports</div>
        </div>
      </div>

      {/* Auto header */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,padding:'14px 20px',marginBottom:20,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px 24px'}}>
        {[['Project Name',rec.project],['Mode',rec.mode],['Completion Date',rec.completionDate],['Total Length (km)',rec.totalLength||'89.4'],['PCOD Length (km)',rec.pcodLength||'89.4'],['Physical Progress',rec.physicalProgress+'%']].map(([l,v],i)=>(
          <div key={i}><div style={{fontSize:11,color:C.muted,fontWeight:500,marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:C.text,background:C.surface,padding:'5px 10px',borderRadius:4}}>{v}</div></div>
        ))}
      </div>

      {/* Per-test report cards */}
      {reports.map((r,ri)=>(
        <div key={r.id} style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,marginBottom:16,overflow:'hidden'}}>
          <div style={{padding:'10px 16px',background:C.surface,borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <span style={{fontSize:13,fontWeight:700,color:C.primaryDark}}>{ri+1}. {r.testName}</span>
              <span style={{fontSize:12,color:C.muted,marginLeft:12}}>Ch. {r.chainFrom} – {r.chainTo} km · Sched: {r.schedDate}</span>
            </div>
            {r.result&&<Badge status={r.result==='Acceptable'?'pcc-issued':'cl-rejected'} label={r.result}/>}
          </div>
          <div style={{padding:'16px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
            <div style={{gridColumn:'1/-1',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
              <div><div style={{fontSize:11,color:C.muted,fontWeight:500,marginBottom:3}}>AE/IE Representative (Auto)</div><div style={{fontSize:13,fontWeight:600,color:C.text,background:C.surface,padding:'8px 12px',borderRadius:4}}>{r.rep}</div></div>
              <div><div style={{fontSize:11,color:C.muted,fontWeight:500,marginBottom:3}}>Designation (Auto)</div><div style={{fontSize:13,fontWeight:600,color:C.text,background:C.surface,padding:'8px 12px',borderRadius:4}}>{r.desig}</div></div>
              <FormField label="Name of Witness Authority (PIU)" required value={r.witness} onChange={v=>upd(r.id,'witness',v)} placeholder="Enter PIU witness name"/>
            </div>
            <FormField label="Actual Test Date & Time" type="datetime-local" required value={r.actualDate} onChange={v=>upd(r.id,'actualDate',v)}/>
            <FormField label="Upload Test Report" type="file" required value={r.reportFile} onChange={v=>upd(r.id,'reportFile',v)}/>
            <FormField label="Upload Photos (JPG/PNG, max 10)" type="file" required value={r.photos} onChange={v=>upd(r.id,'photos',v)} hint="Click to upload multiple photos"/>
            <div>
              <div style={{fontSize:12,color:C.muted,fontWeight:500,marginBottom:4}}>Test Result <span style={{color:C.error}}>*</span></div>
              <div style={{display:'flex',gap:12}}>
                {['Acceptable','Reject & Re-Schedule'].map(opt=>(
                  <label key={opt} style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',padding:'8px 14px',borderRadius:100,border:`1px solid ${r.result===opt?C.primary:C.border}`,background:r.result===opt?(opt==='Acceptable'?C.successBg:C.errorBg):'#fff',fontSize:13,fontWeight:500}}>
                    <input type="radio" name={`result-${r.id}`} checked={r.result===opt} onChange={()=>upd(r.id,'result',opt)} style={{accentColor:C.primary}}/>
                    <span style={{color:r.result===opt?(opt==='Acceptable'?C.success:C.error):C.text}}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{gridColumn:'2/-1'}}>
              <FormField label="Remarks" type="textarea" required rows={2} value={r.remarks} onChange={v=>upd(r.id,'remarks',v)} placeholder="Enter test remarks (max 2000 characters)"/>
            </div>
          </div>
        </div>
      ))}

      <div style={{display:'flex',gap:12,justifyContent:'flex-end',marginTop:8}}>
        <Btn v='text' onClick={onBack}>Cancel</Btn>
        <Btn v='outlined'>Save</Btn>
        <Btn icon={<Ic d={P.sign} s={15} c='#fff' str sw={2}/>} onClick={handleSubmit}>Sign & Submit</Btn>
      </div>
    </div>
  );
}

/* ── PCOD REQUEST ─────────────────────────────────────── */
function PCODRequestScreen({record,onBack,onNavigate}) {
  const rec=record||RECORDS[0];
  const [form,setForm]=useState({pcodLength:'',inspectionLetter:'',remarks:''});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const [submitted,setSubmitted]=useState(false);

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>PCOD Request Submitted</div>
      <div style={{fontSize:14,color:C.muted}}>Status: PCOD Requested. Proceed to add Punchlist items.</div>
      <div style={{display:'flex',gap:12}}><Btn v='outlined' onClick={onBack}>Back to Grid</Btn><Btn onClick={()=>onNavigate('punchlist',rec)}>Add Punchlist Items</Btn></div>
    </div>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto',maxWidth:800}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>Request for PCOD</div>
        </div>
      </div>
      <div style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,padding:24}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
          <FormField label="Project Name" value={rec.project} readOnly/>
          <FormField label="Mode (Contract Type)" value={rec.mode} readOnly/>
          <FormField label="Scheduled / Likely Completion Date" value={rec.completionDate} readOnly/>
          <FormField label="Total Project Length (km)" value={rec.totalLength||'89.4'} readOnly/>
          <FormField label="Physical Progress (%)" value={rec.physicalProgress+'%'} readOnly/>
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <FormField label="PCOD Project Length (km)" required value={form.pcodLength} onChange={v=>set('pcodLength',v)} placeholder="Must be ≤ Total Project Length"/>
          <FormField label="Letter for Inspection / Provisional Completion Certificate" type="file" required value={form.inspectionLetter} onChange={v=>set('inspectionLetter',v)}/>
          <div style={{gridColumn:'1/-1'}}>
            <FormField label="Remarks" type="textarea" rows={3} value={form.remarks} onChange={v=>set('remarks',v)} placeholder="Optional, max 2000 characters"/>
          </div>
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'flex-end',marginTop:20}}>
          <Btn v='text' onClick={onBack}>Cancel</Btn>
          <Btn onClick={()=>setSubmitted(true)}>Submit PCOD Request</Btn>
        </div>
      </div>
    </div>
  );
}

/* ── ADD PUNCHLIST / PUNCHLIST MONITORING ─────────────── */
function PunchlistScreen({record,role,onBack}) {
  const rec=record||RECORDS[0];
  const isContractor=role==='Contractor';

  const [listANA,setListANA]=useState(false);
  const [listBNA,setListBNA]=useState(false);
  const [listBDate,setListBDate]=useState('');
  const [outstandingDoc,setOutstandingDoc]=useState('');
  const [listA,setListA]=useState([
    {id:1,type:"Contractor's Liability",punchType:'Select',item:'MBCB installation incomplete near Ch. 23+400',days:'30',dueDate:'28-May-26',chainFrom:'23.400',chainTo:'23.600',qty:'200',unit:'Mtr.',workCA:'CA',side:'Both',carriage:'MCW'},
    {id:2,type:"Contractor's Liability",punchType:'Select',item:'Street lighting poles not operational — Toll Plaza approach',days:'30',dueDate:'28-May-26',chainFrom:'45.000',chainTo:'45.500',qty:'12',unit:'Nos',workCA:'CA',side:'LHS',carriage:'SRW'},
  ]);
  const [listB,setListB]=useState([
    {id:1,type:"NHAI's Liability",punchType:'Select',item:'Median plantation density below Schedule C requirement',reason:'Land dispute near Ch. 45+000 pending resolution',chainFrom:'45.000',chainTo:'48.000',qty:'3',unit:'Km',workCA:'CA',side:'Both',carriage:'MEDIAN',likelyDate:'2026-07-30'},
  ]);
  const [submitted,setSubmitted]=useState(false);

  const addA=()=>setListA(l=>[...l,{id:Date.now(),type:"Contractor's Liability",punchType:'Select',item:'',days:'',dueDate:'',chainFrom:'',chainTo:'',qty:'',unit:'Km',workCA:'CA',side:'LHS',carriage:'MCW'}]);
  const addB=()=>setListB(l=>[...l,{id:Date.now(),type:"NHAI's Liability",punchType:'Select',item:'',reason:'',chainFrom:'',chainTo:'',qty:'',unit:'Km',workCA:'CA',side:'LHS',carriage:'MCW',likelyDate:''}]);
  const updA=(id,k,v)=>setListA(l=>l.map(x=>x.id===id?{...x,[k]:v}:x));
  const updB=(id,k,v)=>setListB(l=>l.map(x=>x.id===id?{...x,[k]:v}:x));

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>Punchlist Submitted</div>
      <div style={{fontSize:14,color:C.muted}}>Status: Punchlist Submitted. RO will upload site visit report.</div>
      <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
    </div>
  );

  const colStyle={padding:'8px 10px',fontSize:11,fontWeight:600,color:C.muted};
  const cellStyle={padding:'4px 6px',borderRight:`1px solid ${C.divider}`};

  const inp=(v,fn,ph='')=>(
    <input value={v} onChange={e=>fn(e.target.value)} placeholder={ph}
      style={{width:'100%',border:'none',padding:'7px 6px',fontSize:12,outline:'none',background:'transparent',color:C.text}}/>
  );
  const sel=(v,fn,opts)=>(
    <select value={v} onChange={e=>fn(e.target.value)} style={{width:'100%',border:'none',padding:'7px 4px',fontSize:12,outline:'none',background:'transparent'}}>
      {opts.map(o=><option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>{isMonitoring?'Punchlist Monitoring — Update Status':'Add & Manage Punchlist'}</div>
        </div>
      </div>

      {/* Monitoring mode banner */}
      {isMonitoring&&(
        <div style={{background:'#E3F2FD',border:`1px solid #90CAF9`,borderRadius:8,padding:'10px 16px',marginBottom:16,display:'flex',alignItems:'flex-start',gap:10}}>
          <Ic d={P.refresh} s={16} c='#1565C0' str sw={2}/>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:'#1565C0',marginBottom:2}}>Punchlist Monitoring Active</div>
            <div style={{fontSize:12,color:C.muted}}>PCC issued. Update <strong>Status</strong> and <strong>Progress %</strong> for each item. Other fields are locked. Punchlist closes when all items are Completed.</div>
          </div>
        </div>
      )}

      {/* Header fields */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,padding:'14px 20px',marginBottom:20,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px 24px'}}>
        {[['Project Name',rec.project],['Mode',rec.mode],['Contractor',rec.contractor],['AE/IE Name','Arun Sharma'],['Total Length (km)',rec.totalLength||'89.4'],['PCOD Length (km)',rec.pcodLength||'89.4'],['PCOD Date',"28 Apr'26"],['Completion Date',rec.completionDate]].map(([l,v],i)=>(
          <div key={i}><div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:C.text,background:C.surface,padding:'5px 10px',borderRadius:4}}>{v}</div></div>
        ))}
      </div>

      <FormField label="Copy of Outstanding Items Jointly Signed by AE/IE and Contractor" type="file" required value={outstandingDoc} onChange={setOutstandingDoc}/>

      {/* ── LIST A ─────────────────────────── */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,overflow:'hidden',marginTop:20,marginBottom:20}}>
        <div style={{padding:'12px 16px',background:'#E3F2FD',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <span style={{fontSize:13,fontWeight:700,color:'#1565C0'}}>Punch List — Type A (Contractor's Liability / Other)</span>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>Completion due: PCC Issue Date + {rec.mode==='EPC'?'30':'90'} days</div>
          </div>
          {!isMonitoring&&<label style={{display:'flex',alignItems:'center',gap:6,fontSize:13,fontWeight:500,color:C.muted,cursor:'pointer'}}>
            <input type="radio" checked={listANA} onChange={()=>setListANA(!listANA)} style={{accentColor:C.primary}}/>
            Not Applicable
          </label>}
        </div>
        {!listANA&&(
          <>
            <div style={{overflowX:'auto'}}>
              <div style={{display:'grid',gridTemplateColumns:'36px 80px 1fr 80px 80px 70px 80px 90px 100px 70px 80px 80px 36px',minWidth:1100,background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                {['S.No','Punchlist Type','Punchlist Items','Days w.e.f PCC Date','Due Date','Ch. From','Ch. To','Qty','Units','Work CA/COS','Side','Carriageway',''].map((h,i)=><div key={i} style={colStyle}>{h}</div>)}
              </div>
              {listA.map((r,ri)=>(
                <div key={r.id} style={{display:'grid',gridTemplateColumns:'36px 80px 1fr 80px 80px 70px 80px 90px 100px 70px 80px 80px 36px',minWidth:1100,borderBottom:ri<listA.length-1?`1px solid ${C.divider}`:'none'}}>
                  <div style={{...cellStyle,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:C.muted}}>{ri+1}</div>
                  <div style={cellStyle}>{sel(r.punchType||'Select',v=>updA(r.id,'punchType',v),['Select','Mandatory','Optional'])}</div>
                  <div style={cellStyle}>{inp(r.item,v=>updA(r.id,'item',v),'Describe pending work item…')}</div>
                  <div style={cellStyle}>{inp(r.days,v=>updA(r.id,'days',v),'1-'+(rec.mode==='EPC'?'30':'90'))}</div>
                  <div style={{...cellStyle,padding:'8px 6px',fontSize:12,color:C.muted,background:C.surface}}>{r.days?`PCC + ${r.days}d`:'Auto-calc'}</div>
                  <div style={cellStyle}>{inp(r.chainFrom,v=>updA(r.id,'chainFrom',v),'0.000')}</div>
                  <div style={cellStyle}>{inp(r.chainTo,v=>updA(r.id,'chainTo',v),'89.4')}</div>
                  <div style={cellStyle}>{inp(r.qty,v=>updA(r.id,'qty',v),'0')}</div>
                  <div style={cellStyle}>{sel(r.unit||'Km',v=>updA(r.id,'unit',v),['Km','Mtr.','Sq.M','Cu.M','Nos'])}</div>
                  <div style={cellStyle}>{sel(r.workCA||'CA',v=>updA(r.id,'workCA',v),['CA','COS'])}</div>
                  <div style={cellStyle}>{sel(r.side||'LHS',v=>updA(r.id,'side',v),['LHS','RHS','Both'])}</div>
                  <div style={cellStyle}>{sel(r.carriage||'MCW',v=>updA(r.id,'carriage',v),['MCW','SRW','MEDIAN','Avenue','Other'])}</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:4}}><button onClick={()=>setListA(l=>l.filter(x=>x.id!==r.id))} style={{background:'none',border:'none',cursor:'pointer',display:'flex'}}><Ic d={P.trash} s={14} c={C.error} str sw={1.5}/></button></div>
                </div>
              ))}
            </div>
            {isContractor&&<div style={{padding:'10px 16px',borderTop:`1px solid ${C.divider}`}}><Btn v='ghost' sz='sm' onClick={addA} icon={<Ic d={P.plus} s={12} c={C.primaryDark} str sw={2.5}/>}>Add Row</Btn></div>}
          </>
        )}
        {listANA&&<div style={{padding:'20px',textAlign:'center',color:C.muted,fontSize:13}}>List A marked as Not Applicable</div>}
      </div>

      {/* ── LIST B ─────────────────────────── */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:20}}>
        <div style={{padding:'12px 16px',background:'#FFF3E0',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
          <div>
            <span style={{fontSize:13,fontWeight:700,color:'#E65100'}}>Punch List — Type B (NHAI's Liability)</span>
            {!isMonitoring&&<div style={{display:'flex',alignItems:'center',gap:10,marginTop:6}}>
              <span style={{fontSize:12,color:C.muted,fontWeight:500}}>Likely Scheduled Completion Date for List B:</span>
              <input type="date" value={listBDate} onChange={e=>setListBDate(e.target.value)} style={{border:`1px solid ${C.border}`,borderRadius:4,padding:'4px 8px',fontSize:12,outline:'none'}}/>
            </div>}
          </div>
          {!isMonitoring&&<label style={{display:'flex',alignItems:'center',gap:6,fontSize:13,fontWeight:500,color:C.muted,cursor:'pointer'}}>
            <input type="radio" checked={listBNA} onChange={()=>setListBNA(!listBNA)} style={{accentColor:C.primary}}/>
            Not Applicable
          </label>}
        </div>
        {!listBNA&&(
          <>
            <div style={{overflowX:'auto'}}>
              <div style={{display:'grid',gridTemplateColumns:'36px 80px 1fr 1fr 70px 80px 90px 100px 70px 80px 80px 100px 36px',minWidth:1200,background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                {['S.No','Punchlist Type','Punchlist Items','Reason for Delay','Ch. From','Ch. To','Qty','Units','Work CA/COS','Side','Carriage','Likely Completion',''].map((h,i)=><div key={i} style={colStyle}>{h}</div>)}
              </div>
              {listB.map((r,ri)=>(
                <div key={r.id} style={{display:'grid',gridTemplateColumns:'36px 80px 1fr 1fr 70px 80px 90px 100px 70px 80px 80px 100px 36px',minWidth:1200,borderBottom:ri<listB.length-1?`1px solid ${C.divider}`:'none'}}>
                  <div style={{...cellStyle,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:C.muted}}>{ri+1}</div>
                  <div style={cellStyle}>{sel(r.punchType||'Select',v=>updB(r.id,'punchType',v),['Select','Mandatory','Optional'])}</div>
                  <div style={cellStyle}>{inp(r.item,v=>updB(r.id,'item',v),'Pending work item…')}</div>
                  <div style={cellStyle}>{inp(r.reason,v=>updB(r.id,'reason',v),'Reason for NHAI liability…')}</div>
                  <div style={cellStyle}>{inp(r.chainFrom,v=>updB(r.id,'chainFrom',v),'0.000')}</div>
                  <div style={cellStyle}>{inp(r.chainTo,v=>updB(r.id,'chainTo',v),'89.4')}</div>
                  <div style={cellStyle}>{inp(r.qty,v=>updB(r.id,'qty',v),'0')}</div>
                  <div style={cellStyle}>{sel(r.unit||'Km',v=>updB(r.id,'unit',v),['Km','Mtr.','Sq.M','Cu.M','Nos'])}</div>
                  <div style={cellStyle}>{sel(r.workCA||'CA',v=>updB(r.id,'workCA',v),['CA','COS'])}</div>
                  <div style={cellStyle}>{sel(r.side||'LHS',v=>updB(r.id,'side',v),['LHS','RHS','Both'])}</div>
                  <div style={cellStyle}>{sel(r.carriage||'MCW',v=>updB(r.id,'carriage',v),['MCW','SRW','MEDIAN','Avenue','Other'])}</div>
                  <div style={cellStyle}><input type="date" value={r.likelyDate||''} onChange={e=>updB(r.id,'likelyDate',e.target.value)} style={{width:'100%',border:'none',padding:'7px 4px',fontSize:12,outline:'none',background:'transparent'}}/></div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:4}}><button onClick={()=>setListB(l=>l.filter(x=>x.id!==r.id))} style={{background:'none',border:'none',cursor:'pointer',display:'flex'}}><Ic d={P.trash} s={14} c={C.error} str sw={1.5}/></button></div>
                </div>
              ))}
            </div>
            {isContractor&&<div style={{padding:'10px 16px',borderTop:`1px solid ${C.divider}`}}><Btn v='ghost' sz='sm' onClick={addB} icon={<Ic d={P.plus} s={12} c={C.primaryDark} str sw={2.5}/>}>Add Row</Btn></div>}
          </>
        )}
        {listBNA&&<div style={{padding:'20px',textAlign:'center',color:C.muted,fontSize:13}}>List B marked as Not Applicable</div>}
      </div>

      {isContractor&&<div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
        <Btn v='text' onClick={onBack}>Cancel</Btn>
        <Btn v='outlined'>Save as Draft</Btn>
        <Btn onClick={()=>setSubmitted(true)}>Submit Punchlist</Btn>
      </div>}
    </div>
  );
}

/* ── PUNCHLIST MONITORING ────────────────────────────── */
function PunchlistMonitoringScreen({record,role,onBack,onNavigate}) {
  const rec=record||RECORDS[0];
  const isContractor=role==='Contractor';
  const isPD=role==='PD';

  const [listA,setListA]=useState([
    {id:1,item:'MBCB installation incomplete near Ch. 23+400',chainFrom:'23.400',dueDate:'28-May-26',reason:'',status:'Pending',progress:'0',docFile:'',remarks:''},
    {id:2,item:'Street lighting poles not operational — Toll Plaza approach',chainFrom:'45.000',dueDate:'28-May-26',reason:'',status:'Pending',progress:'0',docFile:'',remarks:''},
  ]);
  const [listB,setListB]=useState([
    {id:1,item:'Median plantation density below Schedule C requirement',chainFrom:'45.000',likelyDate:'2026-07-30',reason:'Land dispute near Ch. 45+000 pending resolution',status:'Pending',progress:'0',docFile:'',remarks:''},
  ]);
  const [submitted,setSubmitted]=useState(false);

  const updA=(id,k,v)=>setListA(l=>l.map(x=>x.id===id?{...x,[k]:v}:x));
  const updB=(id,k,v)=>setListB(l=>l.map(x=>x.id===id?{...x,[k]:v}:x));

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>Punchlist Updated Successfully</div>
      <div style={{fontSize:14,color:C.muted}}>Status updates saved. Continue updating until all items are Completed.</div>
      <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
    </div>
  );

  const colStyle={padding:'8px 10px',fontSize:11,fontWeight:600,color:C.muted};
  const cellStyle={padding:'4px 6px',borderRight:`1px solid ${C.divider}`};
  const statusColor={Completed:C.success,'In Process':C.warning,Pending:C.muted,Descoped:'#8e44ad',Delinking:'#e67e22'};

  const inp=(v,fn,ph='')=>(
    <input value={v} onChange={e=>fn(e.target.value)} placeholder={ph}
      style={{width:'100%',border:'none',padding:'7px 6px',fontSize:12,outline:'none',background:'transparent',color:C.text}}/>
  );
  const sel=(v,fn,opts)=>(
    <select value={v} onChange={e=>fn(e.target.value)} style={{width:'100%',border:'none',padding:'7px 4px',fontSize:12,outline:'none',background:'transparent',color:statusColor[v]||C.text,fontWeight:600}}>
      {opts.map(o=><option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>Punchlist Monitoring — Update Status</div>
        </div>
      </div>

      <div style={{background:'#E3F2FD',border:`1px solid #90CAF9`,borderRadius:8,padding:'10px 16px',marginBottom:16,display:'flex',alignItems:'flex-start',gap:10}}>
        <Ic d={P.refresh} s={16} c='#1565C0' str sw={2}/>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:'#1565C0',marginBottom:2}}>Punchlist Monitoring Active</div>
          <div style={{fontSize:12,color:C.muted}}>PCC issued. Update <strong>Status</strong> and <strong>Progress %</strong> for each item. Punchlist closes when all items are Completed.</div>
        </div>
      </div>

      {/* Header fields */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,padding:'14px 20px',marginBottom:20,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px 24px'}}>
        {[['Project Name',rec.project],['Mode',rec.mode],['Contractor',rec.contractor],['AE/IE Name','Arun Sharma'],['PCOD Date',"28 Apr'26"],['Completion Date',rec.completionDate],['PCC Status','Issued'],['Punchlist Status','Active']].map(([l,v],i)=>(
          <div key={i}><div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:C.text,background:C.surface,padding:'5px 10px',borderRadius:4}}>{v}</div></div>
        ))}
      </div>

      {/* ── LIST A MONITORING ─────────────────────────── */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:20}}>
        <div style={{padding:'12px 16px',background:'#E3F2FD',borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontSize:13,fontWeight:700,color:'#1565C0'}}>Punch List — Type A (Contractor's Liability)</span>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Monitor and update completion status for Contractor liability items</div>
        </div>
        <div style={{overflowX:'auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'36px 1.5fr 70px 100px 80px 100px 80px 36px',minWidth:750,background:C.surface,borderBottom:`1px solid ${C.border}`}}>
            {['S.No','Punchlist Items','Ch. From','Due Date','Status','Progress (%)','Upload Doc',''].map((h,i)=><div key={i} style={colStyle}>{h}</div>)}
          </div>
          {listA.map((r,ri)=>(
            <div key={r.id} style={{borderBottom:ri<listA.length-1?`1px solid ${C.divider}`:'none'}}>
              <div style={{display:'grid',gridTemplateColumns:'36px 1.5fr 70px 100px 80px 100px 80px 36px',minWidth:750}}>
                <div style={{...cellStyle,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:C.muted}}>{ri+1}</div>
                <div style={{...cellStyle,padding:'8px 10px',fontSize:12,fontWeight:500,color:C.text}}>{r.item}</div>
                <div style={{...cellStyle,padding:'8px 6px',fontSize:12,color:C.muted}}>{r.chainFrom}</div>
                <div style={{...cellStyle,padding:'8px 6px',fontSize:12,color:C.muted}}>{r.dueDate}</div>
                <div style={cellStyle}>
                  {isContractor?sel(r.status,(v)=>updA(r.id,'status',v),['Pending','In Process','Completed','Descoped','Delinking']):<div style={{padding:'7px 6px',fontSize:12,color:statusColor[r.status]||C.text,fontWeight:600}}>{r.status}</div>}
                </div>
                <div style={cellStyle}>
                  {isContractor?(
                    <div style={{display:'flex',alignItems:'center',gap:4,padding:'4px 6px'}}>
                      <input type="number" min="0" max="100" value={r.progress} onChange={e=>updA(r.id,'progress',e.target.value)}
                        style={{width:50,border:`1px solid ${C.border}`,borderRadius:4,padding:'4px 6px',fontSize:12,outline:'none'}}/>
                      <span style={{fontSize:11,color:C.muted}}>%</span>
                    </div>
                  ):<div style={{padding:'7px 6px',fontSize:12,color:C.muted}}>{r.progress}%</div>}
                </div>
                <div style={cellStyle}>
                  {isContractor?(
                    <label style={{display:'flex',alignItems:'center',justifyContent:'center',padding:6,cursor:'pointer',color:C.primaryDark}}>
                      <Ic d={P.upload} s={14} c={C.primaryDark} str sw={1.5}/>
                      <input type="file" style={{display:'none'}} onChange={e=>updA(r.id,'docFile',e.target.files[0]?.name||'')}/>
                    </label>
                  ):r.docFile?<div style={{color:C.success}}>📎 {r.docFile}</div>:<div style={{color:C.muted,fontSize:11}}>—</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIST B MONITORING ─────────────────────────── */}
      <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:20}}>
        <div style={{padding:'12px 16px',background:'#FFF3E0',borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontSize:13,fontWeight:700,color:'#E65100'}}>Punch List — Type B (NHAI's Liability)</span>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Monitor NHAI liability items {isPD?'and approve status updates':''}</div>
        </div>
        <div style={{overflowX:'auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'36px 1.5fr 70px 100px 80px 100px 80px 36px',minWidth:750,background:C.surface,borderBottom:`1px solid ${C.border}`}}>
            {['S.No','Punchlist Items','Ch. From','Likely Completion','Status','Progress (%)','Upload Doc',''].map((h,i)=><div key={i} style={colStyle}>{h}</div>)}
          </div>
          {listB.map((r,ri)=>(
            <div key={r.id} style={{borderBottom:ri<listB.length-1?`1px solid ${C.divider}`:'none'}}>
              <div style={{display:'grid',gridTemplateColumns:'36px 1.5fr 70px 100px 80px 100px 80px 36px',minWidth:750}}>
                <div style={{...cellStyle,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:C.muted}}>{ri+1}</div>
                <div style={{...cellStyle,padding:'8px 10px',fontSize:12,fontWeight:500,color:C.text}}>{r.item}</div>
                <div style={{...cellStyle,padding:'8px 6px',fontSize:12,color:C.muted}}>{r.chainFrom}</div>
                <div style={{...cellStyle,padding:'8px 6px',fontSize:12,color:C.muted}}>{r.likelyDate}</div>
                <div style={cellStyle}>
                  <div style={{padding:'7px 6px',fontSize:12,color:statusColor[r.status]||C.text,fontWeight:600}}>{r.status}</div>
                </div>
                <div style={cellStyle}>
                  <div style={{padding:'7px 6px',fontSize:12,color:C.muted}}>{r.progress}%</div>
                </div>
                <div style={cellStyle}>
                  {r.docFile?<div style={{color:C.success}}>📎 {r.docFile}</div>:<div style={{color:C.muted,fontSize:11}}>—</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isContractor&&<div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
        <Btn v='text' onClick={onBack}>Cancel</Btn>
        <Btn onClick={()=>setSubmitted(true)}>Save Status Updates</Btn>
      </div>}
    </div>
  );
}

/* ── RO SITE VISIT ───────────────────────────────────── */
function ROSiteVisitScreen({record,onBack}) {
  const rec=record||RECORDS[0];
  const [letterType,setLetterType]=useState('');
  const [letterFile,setLetterFile]=useState('');
  const [ckContent,setCkContent]=useState('');
  const [generated,setGenerated]=useState(false);
  const [obs,setObs]=useState([{id:1,text:'',responsible:'Contractor'}]);
  const [submitted,setSubmitted]=useState(false);
  const addObs=()=>setObs(o=>[...o,{id:Date.now(),text:'',responsible:'Contractor'}]);
  const updObs=(id,k,v)=>setObs(o=>o.map(x=>x.id===id?{...x,[k]:v}:x));

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>Site Visit Report Submitted</div>
      <div style={{fontSize:14,color:C.muted}}>Observations shared with assigned parties. Status: Observation Shared by RO.</div>
      <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
    </div>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto',maxWidth:900}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>Upload RO Site Visit Report</div>
        </div>
      </div>

      <div style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,padding:24}}>
        <SectionBox title="Site Visit Letter">
          <FormField label="Type of Site Visit Letter" type="radio" required value={letterType} onChange={setLetterType}
            options={[{v:'generate',l:'Generate Letter (DSC)'},{v:'upload',l:'Upload Letter'}]}/>
          {letterType==='generate'&&!generated&&(
            <div style={{marginTop:16}}>
              <div style={{fontSize:12,color:C.muted,marginBottom:8}}>Draft Site Visit Letter</div>
              <textarea value={ckContent} onChange={e=>setCkContent(e.target.value)} rows={8}
                style={{width:'100%',border:`1px solid ${C.border}`,borderRadius:4,padding:12,fontSize:13,lineHeight:'20px',outline:'none',resize:'vertical',boxSizing:'border-box'}}
                placeholder="Type the site visit letter content here…&#10;&#10;Subject: Site Visit Report — Gurugram–Faridabad Expressway&#10;&#10;With reference to the above mentioned project, it is to inform that a site visit was conducted on [Date] by the Regional Officer team…"/>
              <div style={{marginTop:12,display:'flex',gap:10}}>
                <Btn icon={<Ic d={P.sign} s={15} c='#fff' str sw={2}/>} onClick={()=>setGenerated(true)}>Generate Letter (DSC)</Btn>
              </div>
            </div>
          )}
          {letterType==='generate'&&generated&&(
            <div style={{marginTop:12,padding:'12px 16px',background:C.successBg,borderRadius:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}><Ic d={P.doc} s={18} c={C.success} str sw={1.5}/><span style={{fontSize:13,fontWeight:600,color:C.success}}>Site_Visit_Letter_Signed.pdf</span><span style={{fontSize:11,color:C.muted}}>Digitally Signed</span></div>
              <div style={{display:'flex',gap:8}}><Ic d={P.eye} s={16} c={C.primaryDark} str sw={1.5}/><Ic d={P.download} s={16} c={C.primaryDark} str sw={1.5}/></div>
            </div>
          )}
          {letterType==='upload'&&(
            <div style={{marginTop:12}}><FormField label="Upload Site Visit Letter" type="file" required value={letterFile} onChange={setLetterFile}/></div>
          )}
        </SectionBox>

        <SectionBox title="Observations">
          <div style={{display:'grid',gridTemplateColumns:'40px 1fr 160px 36px',gap:0,background:C.surface,borderRadius:8,marginBottom:8}}>
            {['S.No','Observation','Responsible Party',''].map((h,i)=><div key={i} style={{padding:'8px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>)}
          </div>
          {obs.map((o,oi)=>(
            <div key={o.id} style={{display:'grid',gridTemplateColumns:'40px 1fr 160px 36px',borderBottom:oi<obs.length-1?`1px solid ${C.divider}`:'none',padding:'4px 0'}}>
              <div style={{padding:'10px 12px',fontSize:13,fontWeight:500,color:C.muted}}>{oi+1}</div>
              <div style={{padding:'4px 8px'}}><textarea value={o.text} onChange={e=>updObs(o.id,'text',e.target.value)} rows={2} style={{width:'100%',border:`1px solid ${C.border}`,borderRadius:4,padding:'7px 10px',fontSize:13,outline:'none',resize:'vertical',boxSizing:'border-box'}} placeholder="Enter observation…"/></div>
              <div style={{padding:'4px 8px'}}><select value={o.responsible} onChange={e=>updObs(o.id,'responsible',e.target.value)} style={{width:'100%',border:`1px solid ${C.border}`,borderRadius:4,padding:'8px 10px',fontSize:13,outline:'none'}}>
                {['Contractor','AE/IE','RO','PD'].map(r=><option key={r}>{r}</option>)}
              </select></div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><button onClick={()=>setObs(o=>o.filter(x=>x.id!==o.id))} style={{background:'none',border:'none',cursor:'pointer',display:'flex'}}><Ic d={P.trash} s={14} c={C.error} str sw={1.5}/></button></div>
            </div>
          ))}
          <div style={{marginTop:10}}><Btn v='ghost' sz='sm' onClick={addObs} icon={<Ic d={P.plus} s={12} c={C.primaryDark} str sw={2.5}/>}>Add Observation</Btn></div>
        </SectionBox>

        <div style={{display:'flex',gap:12,justifyContent:'flex-end',marginTop:8}}>
          <Btn v='text' onClick={onBack}>Cancel</Btn>
          <Btn onClick={()=>setSubmitted(true)}>Submit & Share Observations</Btn>
        </div>
      </div>
    </div>
  );
}

/* ── COMPLIANCE SCREEN ───────────────────────────────── */
function ComplianceScreen({record,role,onBack}) {
  const rec=record||RECORDS[0];
  const [data,setData]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const sampleObs=[
    {id:1,text:'MBCB installation incomplete near Ch. 23+400 to Ch. 23+600. Width of crash barrier not as per specification.',responsible:'Contractor'},
    {id:2,text:'Median plantation density does not meet Schedule C requirement. Replanting required at Ch. 45+000 to Ch. 48+000.',responsible:'PD'},
    {id:3,text:'Street lighting poles at Toll Plaza approach section are not operational. Electrical connections incomplete.',responsible:'Contractor'},
  ];
  const myObs=sampleObs.filter(o=>o.responsible===role);

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>Compliance Submitted</div>
      <div style={{fontSize:14,color:C.muted}}>Your compliance has been recorded against the RO observations.</div>
      <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
    </div>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto',maxWidth:900}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>Update Compliance on RO Site Visit</div>
        </div>
      </div>

      <div style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,padding:24}}>
        {/* RO Letter */}
        <div style={{padding:'10px 14px',background:C.surface,borderRadius:8,marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}><Ic d={P.doc} s={16} c={C.primaryDark} str sw={1.5}/><span style={{fontSize:13,fontWeight:600,color:C.primaryDark}}>RO Site Visit Letter</span></div>
          <div style={{display:'flex',gap:10}}><Btn sz='sm' v='outlined' icon={<Ic d={P.eye} s={13} c={C.primaryDark} str sw={1.5}/>}>View</Btn><Btn sz='sm' v='outlined' icon={<Ic d={P.download} s={13} c={C.primaryDark} str sw={1.5}/>}>Download</Btn></div>
        </div>

        {myObs.length===0&&(
          <div style={{padding:'32px',textAlign:'center',color:C.muted,fontSize:13}}>No observations assigned to {role} role for this record.</div>
        )}

        {myObs.map((o,oi)=>(
          <div key={o.id} style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden',marginBottom:14}}>
            <div style={{padding:'12px 16px',background:'#FFF3E0',borderBottom:`1px solid ${C.border}`,display:'flex',gap:8,alignItems:'flex-start'}}>
              <span style={{fontSize:12,fontWeight:700,color:'#E65100',flexShrink:0}}>Obs {oi+1}</span>
              <span style={{fontSize:13,fontWeight:500,color:C.text}}>{o.text}</span>
            </div>
            <div style={{padding:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={{gridColumn:'1/-1'}}>
                <FormField label={`${role} / AE-IE / PIU Comments`} type="textarea" required rows={3} value={data[`${o.id}-comment`]||''} onChange={v=>setData(d=>({...d,[`${o.id}-comment`]:v}))} placeholder="Describe compliance action taken against this observation (required)…"/>
              </div>
              <FormField label="Upload Photos (Optional)" type="file" value={data[`${o.id}-photos`]||''} onChange={v=>setData(d=>({...d,[`${o.id}-photos`]:v}))} hint="JPG / PNG; multiple allowed; max 20MB"/>
            </div>
            <div style={{padding:'10px 14px',background:'#FFF3E0',borderBottom:`1px solid ${C.border}`,display:'flex',gap:8,alignItems:'flex-start'}}>
              <span style={{fontSize:12,fontWeight:700,color:'#E65100',flexShrink:0}}>Obs {oi+1}</span>
              <span style={{fontSize:13,fontWeight:500,color:C.text}}>{o.text}</span>
            </div>
            <div style={{padding:14,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div style={{gridColumn:'1/-1'}}>
                <FormField label={`${role} Comments`} type="textarea" required rows={3} value={data[`${o.id}-comment`]||''} onChange={v=>setData(d=>({...d,[`${o.id}-comment`]:v}))} placeholder="Describe compliance action taken…"/>
              </div>
              <FormField label="Upload Photos (Optional)" type="file" value={data[`${o.id}-photos`]||''} onChange={v=>setData(d=>({...d,[`${o.id}-photos`]:v}))} hint="JPG/PNG; multiple allowed; max 20MB"/>
            </div>
          </div>
        ))}

        {myObs.length>0&&<div style={{display:'flex',gap:12,justifyContent:'flex-end',marginTop:8}}>
          <Btn v='text' onClick={onBack}>Cancel</Btn>
          <Btn onClick={()=>setSubmitted(true)}>Submit Compliance</Btn>
        </div>}
      </div>
    </div>
  );
}

/* ── ISSUE PCC ───────────────────────────────────────── */
function IssuePCCScreen({record,onBack}) {
  const rec=record||RECORDS[0];
  const [form,setForm]=useState({approvalLetter:'',provDate:'',projStatus:'',letterType:'',nsv:'',punchlist:'',projectComplete:''});
  const [ckContent,setCkContent]=useState('');
  const [generated,setGenerated]=useState(false);
  const [dscModal,setDscModal]=useState(false);
  const [dscToken,setDscToken]=useState('');
  const [dscCert,setDscCert]=useState('');
  const [dscPass,setDscPass]=useState('');
  const [dscSigned,setDscSigned]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  if(submitted) return (
    <div style={{padding:'60px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{width:64,height:64,borderRadius:'50%',background:C.successBg,display:'flex',alignItems:'center',justifyContent:'center'}}><Ic d={P.check} s={28} c={C.success} str sw={2.5}/></div>
      <div style={{fontSize:20,fontWeight:700,color:C.text}}>PCC/PCOD Issued Successfully</div>
      <div style={{fontSize:14,color:C.muted,maxWidth:420,textAlign:'center'}}>Provisional Completion Certificate has been issued and is now available for download by all roles.</div>
      <div style={{display:'flex',gap:12,marginTop:8}}>
        <Btn v='outlined' onClick={onBack}>Back to Grid</Btn>
        <Btn icon={<Ic d={P.download} s={15} c='#fff' str sw={2}/>}>Download PCC</Btn>
      </div>
    </div>
  );

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text}}>Issue Provisional Completion Certificate</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:20,maxWidth:1100}}>
        <div>
          <div style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,padding:24,marginBottom:16}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
              <FormField label="Project Name" value={rec.project} readOnly/>
              <FormField label="Mode" value={rec.mode} readOnly/>
              <FormField label="Scheduled / Likely Completion Date" value={rec.completionDate} readOnly/>
              <FormField label="Total Project Length (km)" value={rec.totalLength||'89.4'} readOnly/>
              <FormField label="Provisional Completion Project Length (km)" value={rec.pcodLength||'89.4'} readOnly hint="Auto-fetched from PCOD request"/>
            </div>

            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <FormField label="Approval Letter of Authority (NHAI)" type="file" required={rec.mode==='EPC'} value={form.approvalLetter} onChange={v=>set('approvalLetter',v)} hint={rec.mode==='EPC'?'Required for EPC mode':'Not required for HAM/BOT'}/>
              <FormField label="Provisional Completion Date of Project" type="date" required value={form.provDate} onChange={v=>set('provDate',v)}/>
              <FormField label="Current Status of Provisional Completed Project" type="select" required value={form.projStatus} onChange={v=>set('projStatus',v)}
                options={['O&M & Toll','Widening & Toll','Transferred to State','Transferred to MoRTH','Transferred to OMT','Transferred to TOT']}/>
              <FormField label="Project Completion" type="radio" required value={form.projectComplete} onChange={v=>set('projectComplete',v)} options={[{v:'Yes',l:'Yes — Project Fully Complete'},{v:'No',l:'No — Pending Items Exist'}]}/>
            </div>
          </div>

          {/* PCC Letter */}
          <SectionBox title="Provisional Completion Certificate" accent>
            <div style={{marginBottom:14}}>
              <FormField label="Type of Provisional Completion Certificate" type="radio" required value={form.letterType} onChange={v=>set('letterType',v)}
                options={[{v:'generate',l:'Generate Letter (with DSC)'},{v:'upload',l:'Upload Signed Letter'}]}/>
            </div>
            {form.letterType==='generate'&&!generated&&(
              <div>
                <div style={{fontSize:12,color:C.muted,marginBottom:8}}>Draft Certificate Content (CK Editor)</div>
                <div style={{border:`1px solid ${C.border}`,borderRadius:4,overflow:'hidden'}}>
                  <div style={{background:C.surface,padding:'6px 12px',borderBottom:`1px solid ${C.border}`,display:'flex',gap:8}}>
                    {['B','I','U','H1','H2','—'].map(t=><button key={t} style={{background:'none',border:`1px solid ${C.border}`,borderRadius:3,padding:'2px 6px',fontSize:11,cursor:'pointer',fontWeight:t==='B'?700:400,fontStyle:t==='I'?'italic':'normal',textDecoration:t==='U'?'underline':'none'}}>{t}</button>)}
                  </div>
                  <textarea value={ckContent} onChange={e=>setCkContent(e.target.value)} rows={10}
                    style={{width:'100%',border:'none',padding:12,fontSize:13,lineHeight:'20px',outline:'none',resize:'vertical',boxSizing:'border-box',fontFamily:'serif'}}
                    placeholder={`PROVISIONAL COMPLETION CERTIFICATE\n\nProject: ${rec.project}\nUPC: ${rec.upc}\nMode: ${rec.mode}\nContractor: ${rec.contractor}\n\nThis is to certify that the above-mentioned project has been provisionally completed in accordance with the Contract Agreement dated...\n\nPending works are captured in the attached Punchlist and shall be completed within the stipulated time period.`}/>
                </div>
                <div style={{marginTop:12,display:'flex',gap:10}}>
                  <Btn icon={<Ic d={P.sign} s={15} c='#fff' str sw={2}/>} onClick={()=>setDscModal(true)}>Generate Letter (DSC)</Btn>
                </div>
              </div>
            )}
            {form.letterType==='generate'&&generated&&(
              <div style={{padding:'12px 16px',background:C.successBg,borderRadius:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><Ic d={P.doc} s={18} c={C.success} str sw={1.5}/><span style={{fontSize:13,fontWeight:600,color:C.success}}>PCC_Certificate_Signed.pdf</span><span style={{fontSize:11,color:C.muted,padding:'1px 6px',background:'#fff',borderRadius:10,border:`1px solid ${C.border}`}}>Digitally Signed</span></div>
                <div style={{display:'flex',gap:8}}><Ic d={P.eye} s={16} c={C.primaryDark} str sw={1.5}/><Ic d={P.download} s={16} c={C.primaryDark} str sw={1.5}/></div>
              </div>
            )}
            {form.letterType==='upload'&&(
              <FormField label="Upload Provisional Completion Certificate" type="file" required value={form.pccFile||''} onChange={v=>set('pccFile',v)}/>
            )}
          </SectionBox>

          <SectionBox title="Supporting Documents">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <FormField label="NSV Test Report" type="file" required value={form.nsv} onChange={v=>set('nsv',v)}/>
              <FormField label="Punch List (Final Signed Document)" type="file" required value={form.punchlist} onChange={v=>set('punchlist',v)}/>
            </div>
          </SectionBox>
        </div>

        {/* Right panel */}
        <div>
          <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,padding:20,position:'sticky',top:16}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:14}}>Punchlist Summary</div>
            {[{type:'List A',items:3,completed:1,pending:2,overdue:0},{type:'List B',items:2,completed:0,pending:2,overdue:1}].map((l,i)=>(
              <div key={i} style={{background:C.surface,borderRadius:8,padding:12,marginBottom:10}}>
                <div style={{fontSize:12,fontWeight:700,color:C.primaryDark,marginBottom:8}}>{l.type}</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                  {[['Total Items',l.items],['Completed',l.completed],['Pending',l.pending],['Overdue',l.overdue]].map(([lbl,v],j)=>(
                    <div key={j} style={{textAlign:'center',padding:'6px',background:'#fff',borderRadius:6}}>
                      <div style={{fontSize:16,fontWeight:700,color:j===3&&v>0?C.error:C.text}}>{v}</div>
                      <div style={{fontSize:10,color:C.muted,fontWeight:500}}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:10}}>
              <Btn style={{width:'100%',justifyContent:'center'}} onClick={()=>setSubmitted(true)}>Submit & Issue PCC</Btn>
              <Btn v='outlined' style={{width:'100%',justifyContent:'center'}}>Save as Draft</Btn>
              <Btn v='text' style={{width:'100%',justifyContent:'center'}} onClick={onBack}>Cancel</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* DSC Modal */}
      <Modal open={dscModal} onClose={()=>setDscModal(false)} title="Digital Signature Certificate (DSC)" width={480}
        footer={<>
          <Btn v='outlined' onClick={()=>setDscModal(false)}>Cancel</Btn>
          <Btn icon={<Ic d={P.sign} s={15} c='#fff' str sw={2}/>} onClick={()=>{setDscModal(false);setGenerated(true);setDscSigned(true);}}>Sign Document</Btn>
        </>}>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{padding:'10px 14px',background:'#E8F0F8',borderRadius:8,fontSize:12,color:C.primaryDark}}>
            Insert your DSC token and select certificate to digitally sign the Provisional Completion Certificate.
          </div>
          <FormField label="Token (Select Device)" type="select" required value={dscToken} onChange={setDscToken} options={['USB Token — ePass3003','USB Token — ePass2003','Refresh Device List…']}/>
          <FormField label="Certificate" type="select" required value={dscCert} onChange={setDscCert} options={['Arun Sharma — NHAI AE (Valid till 2026)','Priya Mehta — NHAI IE (Valid till 2027)']}/>
          <FormField label="Password" type="password" required value={dscPass} onChange={setDscPass} placeholder="Enter token password"/>
          {dscPass&&dscCert&&dscToken&&(
            <div style={{padding:'8px 12px',background:C.successBg,borderRadius:6,fontSize:12,color:C.success,display:'flex',alignItems:'center',gap:6}}>
              <Ic d={P.check} s={14} c={C.success} str sw={2.5}/>
              Ready to sign. Click "Sign Document" to proceed.
            </div>
          )}
          <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>Note: "Signature Not Verified" watermark is expected in DL2 preview. Signed PDF is stored securely and downloadable by all roles.</div>
        </div>
      </Modal>
    </div>
  );
}

/* ── VIEW SUBMISSION ─────────────────────────────────── */
function ViewSubmissionScreen({record,onBack}) {
  const rec=record||RECORDS[0];
  const [tab,setTab]=useState('Project');
  const tabs=['Project','Test Schedule & Report','RO Site Visit','Punchlist','RSA Report'];

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
            <div style={{fontSize:18,fontWeight:700,color:C.text}}>View Submission — Read Only</div>
          </div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <Btn v='outlined' sz='sm' icon={<Ic d={P.download} s={13} c={C.primaryDark} str sw={2}/>}>Export PDF</Btn>
          <Btn v='outlined' sz='sm' icon={<Ic d={P.download} s={13} c={C.primaryDark} str sw={2}/>}>Export Excel</Btn>
        </div>
      </div>

      {/* Record header */}
      <div style={{background:C.navy,borderRadius:12,padding:'16px 24px',marginBottom:20,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px 0'}}>
        {[['UPC',rec.upc||'N-010-052-1001-HR'],['Project',rec.project],['Contractor',rec.contractor],['Mode',rec.mode],['PD',rec.piu],['RO',rec.ro],['Completion Date',rec.completionDate],['Status',rec.status]].map(([l,v],i)=>(
          <div key={i} style={{padding:'0 16px',borderRight:i%4<3?'1px solid rgba(255,255,255,0.1)':'none'}}>
            <div style={{fontSize:10,fontWeight:600,color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:3}}>{l}</div>
            {l==='Status'?<Badge status={v}/>:<div style={{fontSize:13,fontWeight:600,color:'#fff'}}>{v}</div>}
          </div>
        ))}
      </div>

      {/* Section tabs */}
      <div style={{borderRadius:'12px 12px 0 0',overflow:'hidden'}}><Tabs items={tabs} active={tab} onChange={setTab}/></div>
      <div style={{background:'#fff',border:`1px solid ${C.border}`,borderTop:'none',borderRadius:'0 0 12px 12px',padding:20,minHeight:400}}>
        {tab==='Project'&&(
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.primaryDark,marginBottom:16}}>Project Header Information</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px 24px',marginBottom:20}}>
              {[['Project Name',rec.project],['Mode',rec.mode],['Scheduled / Likely Completion Date',rec.completionDate],['Total Project Length (km)',rec.totalLength||'89.4'],['Physical Progress (%)',rec.physicalProgress+'%'],['PCOD Project Length (km)',rec.pcodLength||'89.4']].map(([l,v],i)=>(
                <div key={i} style={{padding:'10px 14px',background:C.surface,borderRadius:8}}>
                  <div style={{fontSize:11,color:C.muted,fontWeight:500,marginBottom:3}}>{l}</div>
                  <div style={{fontSize:13,fontWeight:600,color:C.text}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              {[['Request Letter','doc.pdf'],['Undertaking','undertaking.pdf']].map(([l,f],i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px',border:`1px solid ${C.border}`,borderRadius:8,background:'#fff'}}>
                  <Ic d={P.doc} s={16} c={C.primaryDark} str sw={1.5}/>
                  <span style={{fontSize:13,fontWeight:500,color:C.primaryDark}}>{l}</span>
                  <Ic d={P.download} s={14} c={C.muted} str sw={1.5}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='Test Schedule & Report'&&(
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.primaryDark,marginBottom:14}}>Test Schedule & Reports</div>
            <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'140px 80px 80px 120px 120px 120px 90px 90px 1fr',background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                {['Test Name','Ch. From','Ch. To','Sched. Date','Rep. Name','Witness (PIU)','Actual Date','Result','Remarks'].map((h,i)=>(
                  <div key={i} style={{padding:'9px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>
                ))}
              </div>
              {[
                {name:'Visual & Physical Test',from:'0.000',to:'89.400',sched:"28 Apr'26 10:00am",rep:'Arun Sharma',witness:'R.K. Gupta (PIU)',actual:"28 Apr'26 10:30am",result:'Acceptable',remarks:'All visual checks passed. Physical measurements within tolerance.'},
                {name:'Riding Quality Test',from:'0.000',to:'89.400',sched:"30 Apr'26 9:00am",rep:'Priya Mehta',witness:'S.P. Sharma (PIU)',actual:"30 Apr'26 9:15am",result:'Acceptable',remarks:'IRI value 2.8 m/km — within acceptable limit of 3.5 m/km.'},
                {name:'Environmental Audit',from:'0.000',to:'89.400',sched:"02 May'26 10:00am",rep:'Suresh Pandey',witness:'—',actual:'—',result:'Pending',remarks:'—'},
              ].map((r,ri)=>(
                <div key={ri} style={{display:'grid',gridTemplateColumns:'140px 80px 80px 120px 120px 120px 90px 90px 1fr',borderBottom:ri<2?`1px solid ${C.divider}`:'none'}}>
                  {[r.name,r.from,r.to,r.sched,r.rep,r.witness,r.actual,
                    <Badge status={r.result==='Acceptable'?'pcc-issued':r.result==='Pending'?'pending':'cl-rejected'} label={r.result}/>,
                    r.remarks
                  ].map((cell,ci)=>(
                    <div key={ci} style={{padding:'12px 12px',fontSize:12,fontWeight:ci===0?600:500,color:ci===0?C.primaryDark:C.text,display:'flex',alignItems:'center'}}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='RO Site Visit'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <div style={{fontSize:14,fontWeight:700,color:C.primaryDark}}>RO Observations & Compliance</div>
              <Btn sz='sm' v='outlined' icon={<Ic d={P.eye} s={13} c={C.primaryDark} str sw={1.5}/>}>View RO Letter</Btn>
            </div>
            <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'40px 2fr 100px 2fr',background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                {['No.','RO Observation','Responsible','Compliance Remarks'].map((h,i)=><div key={i} style={{padding:'9px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>)}
              </div>
              {[
                {obs:'MBCB installation incomplete near Ch. 23+400 to Ch. 23+600.',resp:'Contractor',comp:'MBCB installation completed on 25 Apr\'26. Photos uploaded.'},
                {obs:'Median plantation density does not meet Schedule C requirement.',resp:'PD',comp:'Replanting completed at Ch. 45+000 to Ch. 48+000. Geotagging done.'},
                {obs:'Street lighting poles at Toll Plaza approach section are not operational.',resp:'Contractor',comp:'Electrical connections completed. Lighting tested and operational.'},
              ].map((r,ri)=>(
                <div key={ri} style={{display:'grid',gridTemplateColumns:'40px 2fr 100px 2fr',borderBottom:ri<2?`1px solid ${C.divider}`:'none'}}>
                  <div style={{padding:'12px',fontSize:12,color:C.muted,fontWeight:500,display:'flex',alignItems:'flex-start'}}>{ri+1}</div>
                  <div style={{padding:'12px',fontSize:13,fontWeight:500,color:C.text,display:'flex',alignItems:'flex-start'}}>{r.obs}</div>
                  <div style={{padding:'12px',display:'flex',alignItems:'flex-start'}}><Badge status='compliance-submitted' label={r.resp}/></div>
                  <div style={{padding:'12px',fontSize:13,fontWeight:500,color:C.text,display:'flex',alignItems:'flex-start'}}>{r.comp}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='Punchlist'&&(
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.primaryDark,marginBottom:14}}>Punchlist Items</div>
            {['List A — Contractor\'s Liability','List B — NHAI\'s Liability'].map((title,li)=>(
              <div key={li} style={{marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:li===0?'#1565C0':'#E65100',marginBottom:8}}>{title}</div>
                <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden'}}>
                  <div style={{display:'grid',gridTemplateColumns:'40px 2fr 100px 100px 80px 100px',background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                    {['S.No','Punch List Item','Due Date','Status','Progress','Carriageway'].map((h,i)=><div key={i} style={{padding:'9px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>)}
                  </div>
                  {(li===0?[
                    {item:'MBCB installation at Ch. 23+400–23+600',due:"28 May'26",status:'pcc-issued',progress:'100%',carriage:'MCW'},
                    {item:'Road marking at service road junction',due:"15 May'26",status:'pending',progress:'60%',carriage:'SRW'},
                    {item:'Plantation at median Ch. 40+000–50+000',due:"28 May'26",status:'pending',progress:'30%',carriage:'MEDIAN'},
                  ]:[
                    {item:'Utility duct completion by BSNL',due:"30 Jun'26",status:'pending',progress:'0%',carriage:'MCW'},
                    {item:'ROB construction (Railway approval pending)',due:"31 Aug'26",status:'pending',progress:'0%',carriage:'MCW'},
                  ]).map((r,ri)=>(
                    <div key={ri} style={{display:'grid',gridTemplateColumns:'40px 2fr 100px 100px 80px 100px',borderBottom:ri<1?`1px solid ${C.divider}`:'none'}}>
                      <div style={{padding:'12px',fontSize:12,color:C.muted,fontWeight:500}}>{ri+1}</div>
                      <div style={{padding:'12px',fontSize:13,fontWeight:500,color:C.text}}>{r.item}</div>
                      <div style={{padding:'12px',fontSize:12,color:C.muted}}>{r.due}</div>
                      <div style={{padding:'12px'}}><Badge status={r.status} label={r.status==='pcc-issued'?'Completed':'Pending'}/></div>
                      <div style={{padding:'12px',fontSize:13,fontWeight:600,color:r.progress==='100%'?C.success:C.warning}}>{r.progress}</div>
                      <div style={{padding:'12px',fontSize:12,color:C.muted}}>{r.carriage}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==='RSA Report'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <div style={{fontSize:14,fontWeight:700,color:C.primaryDark}}>Road Safety Audit Report</div>
              <Btn sz='sm' v='outlined'>View RSA Grid</Btn>
            </div>
            <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:'auto'}}>
              <div style={{display:'grid',gridTemplateColumns:'40px 2fr 120px 120px 2fr',background:C.surface,borderBottom:`1px solid ${C.border}`,minWidth:800}}>
                {['S.No','RSA Observation','PIU Accepted','RO Accepted','AE/IE Status of Compliance'].map((h,i)=><div key={i} style={{padding:'9px 12px',fontSize:11,fontWeight:600,color:C.muted}}>{h}</div>)}
              </div>
              {[
                {obs:'Missing delineators at Ch. 12+400 merge point',piu:'Yes',ro:'Yes',comp:'Delineators installed and inspected.'},
                {obs:'Inadequate sight distance at Ch. 34+200 junction',piu:'No',ro:'Yes',comp:'Approach widened. Sight distance cleared.'},
                {obs:'Speed limit signs missing between Ch. 56+000–58+000',piu:'Yes',ro:'Yes',comp:'Signs installed as per IRC 67-2023.'},
              ].map((r,ri)=>(
                <div key={ri} style={{display:'grid',gridTemplateColumns:'40px 2fr 120px 120px 2fr',minWidth:800,borderBottom:ri<2?`1px solid ${C.divider}`:'none'}}>
                  <div style={{padding:'12px',fontSize:12,color:C.muted}}>{ri+1}</div>
                  <div style={{padding:'12px',fontSize:13,fontWeight:500,color:C.text}}>{r.obs}</div>
                  <div style={{padding:'12px'}}><Badge status={r.piu==='Yes'?'cl-approved':'cl-rejected'} label={r.piu==='Yes'?'Accepted':'Not Accepted'}/></div>
                  <div style={{padding:'12px'}}><Badge status={r.ro==='Yes'?'cl-approved':'cl-rejected'} label={r.ro==='Yes'?'Accepted':'Not Accepted'}/></div>
                  <div style={{padding:'12px',fontSize:13,fontWeight:500,color:C.text}}>{r.comp}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ACTIVITY LOG ─────────────────────────────────────── */
function ActivityLogScreen({record,onBack}) {
  const rec=record||RECORDS[0];
  const logs=[
    {sno:1,role:'Contractor',user:'Chandra Kumar',action:'Test Schedule Request Created',ts:"26 Apr'26, 9:15am",remarks:'Physical Progress: 88%. Mode: HAM.'},
    {sno:2,role:'Contractor',user:'Chandra Kumar',action:'Checklist Items Submitted (CL1-6)',ts:"26 Apr'26, 2:45pm",remarks:'All 6 checklists submitted for AE/IE review.'},
    {sno:3,role:'AE/IE',user:'Arun Sharma',action:'Checklist Reviewed — Accepted',ts:"27 Apr'26, 11:00am",remarks:'CL1-6 reviewed. Proceeding to CL7 & CL8.'},
    {sno:4,role:'AE/IE',user:'Arun Sharma',action:'AE/IE Checklist Submitted (CL7-8)',ts:"27 Apr'26, 3:30pm",remarks:'CL7: 15 tests marked Yes. CL8: All compliances confirmed.'},
    {sno:5,role:'AE/IE',user:'Priya Mehta',action:'Test Scheduled',ts:"27 Apr'26, 4:00pm",remarks:'6 tests scheduled. Schedule Letter and Consent Letter uploaded.'},
    {sno:6,role:'AE/IE',user:'Priya Mehta',action:'Test Reports Uploaded',ts:"28 Apr'26, 5:30pm",remarks:'3 tests: Acceptable. 0 tests: Reject & Re-Schedule.'},
    {sno:7,role:'Contractor',user:'Chandra Kumar',action:'PCOD Request Submitted',ts:"28 Apr'26, 6:00pm",remarks:'PCOD Project Length: 89.4 km.'},
    {sno:8,role:'AE/IE',user:'Arun Sharma',action:'Punch List Added',ts:"28 Apr'26, 6:30pm",remarks:'List A: 3 items. List B: 2 items. Outstanding items jointly signed.'},
    {sno:9,role:'RO',user:'R.K. Verma',action:'RO Site Visit Report Uploaded',ts:"28 Apr'26, 8:00pm",remarks:'3 observations shared. Responsible parties: Contractor (2), PD (1).'},
    {sno:10,role:'Contractor',user:'Chandra Kumar',action:'Compliance Submitted',ts:"28 Apr'26, 9:15pm",remarks:'Compliance submitted for 2 assigned observations.'},
    {sno:11,role:'PD',user:'S.P. Sharma',action:'Compliance Submitted',ts:"28 Apr'26, 9:45pm",remarks:'Compliance submitted for 1 assigned observation.'},
  ].reverse();

  return (
    <div style={{padding:'24px 32px',flex:1,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.back} s={20} c={C.primaryDark} str/></button>
          <div>
            <div style={{fontSize:12,color:C.muted,marginBottom:1}}>PCC / PCOD › {rec.project}</div>
            <div style={{fontSize:18,fontWeight:700,color:C.text}}>Activity Log</div>
          </div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <Btn v='outlined' sz='sm' icon={<Ic d={P.download} s={13} c={C.primaryDark} str sw={2}/>}>Export PDF</Btn>
          <Btn v='outlined' sz='sm' icon={<Ic d={P.download} s={13} c={C.primaryDark} str sw={2}/>}>Export Excel</Btn>
        </div>
      </div>

      <div style={{background:'#fff',borderRadius:14,border:`1px solid ${C.border}`,overflow:'hidden',boxShadow:'0 2px 4px rgba(0,0,0,0.06)'}}>
        <div style={{display:'grid',gridTemplateColumns:'44px 100px 1fr 1fr 140px 1fr',background:C.surface,borderBottom:`1px solid ${C.border}`}}>
          {['S.No','Role','Stakeholder','Action','Timestamp','Remarks'].map((h,i)=>(
            <div key={i} style={{padding:'10px 14px',fontSize:11,fontWeight:600,color:C.muted,letterSpacing:'-0.005em'}}>{h}</div>
          ))}
        </div>
        {logs.map((l,li)=>{
          const roleColors={Contractor:C.primary,'AE/IE':'#5C6BC0',RO:'#2E7D32',PIU:'#E65100',PD:'#6A1B9A'};
          return (
            <div key={l.sno} style={{display:'grid',gridTemplateColumns:'44px 100px 1fr 1fr 140px 1fr',borderBottom:li<logs.length-1?`1px solid ${C.divider}`:'none',transition:'background 0.1s'}}
              onMouseEnter={e=>e.currentTarget.style.background=C.surface}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{padding:'14px',fontSize:12,fontWeight:500,color:C.muted,display:'flex',alignItems:'center'}}>{l.sno}</div>
              <div style={{padding:'14px',display:'flex',alignItems:'center'}}>
                <span style={{fontSize:11,fontWeight:600,padding:'2px 8px',borderRadius:100,background:(roleColors[l.role]||C.muted)+'18',color:roleColors[l.role]||C.muted}}>{l.role}</span>
              </div>
              <div style={{padding:'14px',fontSize:13,fontWeight:500,color:C.text,display:'flex',alignItems:'center'}}>{l.user}</div>
              <div style={{padding:'14px',fontSize:13,fontWeight:600,color:C.text,display:'flex',alignItems:'center'}}>{l.action}</div>
              <div style={{padding:'14px',fontSize:12,fontWeight:500,color:C.muted,display:'flex',alignItems:'center'}}>{l.ts}</div>
              <div style={{padding:'14px',fontSize:12,fontWeight:400,color:C.muted,display:'flex',alignItems:'center',lineHeight:1.4}}>{l.remarks}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window,{TestScheduleScreen,UploadTestReportsScreen,PCODRequestScreen,PunchlistScreen,PunchlistMonitoringScreen,ROSiteVisitScreen,ComplianceScreen,IssuePCCScreen,ViewSubmissionScreen,ActivityLogScreen});
