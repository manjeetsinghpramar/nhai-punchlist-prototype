
const { useState, useEffect, useRef } = React;

const C = {
  primary:'#034EA2', primaryDark:'#104685', primaryMuted:'#406B9D',
  tabInactive:'#708FB6', border:'#CFD9E7', surface:'#F5F8FC',
  pageBg:'#ECF0F5', navy:'#0D2240', white:'#FFFFFF',
  text:'#212121', muted:'#757575', dark:'#1C1B1F',
  success:'#34A853', successBg:'#D6EEDD',
  warning:'#CC8801', warningBg:'#FFF6E6',
  error:'#B3261D', errorBg:'#FDECEA', divider:'#E8F0F5',
};

const P = {
  menu:'M3 12h18M3 6h18M3 18h18',
  home:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  bell:'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  help:'M12 22a10 10 0 100-20 10 10 0 000 20zM9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01',
  search:'M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z',
  chev:'M9 18l6-6-6-6', chevD:'M6 9l6 6 6-6',
  plus:'M12 5v14M5 12h14', back:'M19 12H5M12 5l-7 7 7 7',
  check:'M20 6L9 17l-5-5', close:'M18 6L6 18M6 6l12 12',
  filter:'M22 3H2l8 9.46V19l4 2v-8.54L22 3',
  upload:'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  download:'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  eye:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z',
  doc:'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z',
  shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  trash:'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
  sign:'M9 12l2 2 4-4M7 22H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2h-2',
  alert:'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  more:'M12 5h.01M12 12h.01M12 19h.01',
  refresh:'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15',
  clock:'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  user:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  list:'M9 12h6M9 8h6M9 16h4M4 6h.01M4 10h.01M4 14h.01M4 18h.01',
};

const Ic = ({d,s=20,c='currentColor',str,sw=2}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={str?'none':c}
    stroke={str?c:'none'} strokeWidth={str?sw:0} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);

const STATUS_MAP = {
  'draft':               {bg:'#F5F8FC',c:'#757575',dot:'#D9D9D9',label:'Draft'},
  'submitted':           {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'Checklist Submitted'},
  'cl-rejected':         {bg:'#FDECEA',c:'#B3261D',dot:'#B3261D',label:'Checklist Rejected'},
  'cl-resubmitted':      {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'Checklist Resubmitted'},
  'cl-approved':         {bg:'#D6EEDD',c:'#34A853',dot:'#34A853',label:'Checklist Approved'},
  'ae-cl-submitted':     {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'AE/IE Checklist Submitted'},
  'test-scheduled':      {bg:'#E8F0F8',c:'#034EA2',dot:'#034EA2',label:'Test Scheduled'},
  'test-rescheduled':    {bg:'#E8F0F8',c:'#034EA2',dot:'#034EA2',label:'Test Rescheduled'},
  'test-uploaded':       {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'Test Report Uploaded'},
  'pcod-requested':      {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'PCOD Requested'},
  'punchlist-submitted': {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'Punchlist Submitted'},
  'ro-observation':      {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'Observation Shared by RO'},
  'compliance-pending':  {bg:'#FFF6E6',c:'#CC8801',dot:'#CC8801',label:'Compliance Pending'},
  'compliance-submitted':{bg:'#E8F0F8',c:'#034EA2',dot:'#034EA2',label:'Compliance Submitted'},
  'pcc-issued':          {bg:'#D6EEDD',c:'#34A853',dot:'#34A853',label:'PCC/PCOD Issued'},
  'punchlist-closed':    {bg:'#D6EEDD',c:'#34A853',dot:'#34A853',label:'Punchlist Closed'},
};

function Badge({status='draft',label,bg,c:tc,dot}) {
  const s = (bg&&tc&&dot)?{bg,c:tc,dot}:(STATUS_MAP[status]||STATUS_MAP.draft);
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'3px 8px',
      borderRadius:2,background:s.bg,color:s.c,fontSize:12,fontWeight:500,
      letterSpacing:'-0.005em',whiteSpace:'nowrap',lineHeight:'18px'}}>
      <span style={{width:7,height:7,borderRadius:'50%',background:s.dot,flexShrink:0}}/>
      {label||s.label}
    </span>
  );
}

function Btn({v='filled',sz='md',children,onClick,disabled,icon,style:sty={}}) {
  const h=sz==='sm'?32:40, px=sz==='sm'?12:22, fs=sz==='sm'?12:14;
  const vs = {
    filled:  {background:disabled?'#D9D9D9':C.primary,color:disabled?C.muted:'#fff',border:'none',boxShadow:disabled?'none':'0 2px 2px rgba(0,0,0,0.12)'},
    outlined:{background:'#fff',color:C.primaryDark,border:`1px solid ${C.primaryDark}`},
    text:    {background:'transparent',color:C.primaryDark,border:'none',paddingLeft:6,paddingRight:6},
    danger:  {background:C.error,color:'#fff',border:'none',boxShadow:'0 2px 2px rgba(0,0,0,0.12)'},
    ghost:   {background:'rgba(3,78,162,0.08)',color:C.primaryDark,border:'none'},
  };
  return (
    <button disabled={disabled} onClick={onClick} style={{
      fontFamily:'Inter,sans-serif',fontWeight:500,fontSize:fs,letterSpacing:'-0.005em',
      cursor:disabled?'not-allowed':'pointer',display:'inline-flex',alignItems:'center',gap:6,
      borderRadius:100,height:h,padding:`0 ${px}px`,transition:'all 0.15s',...vs[v],...sty
    }}>{icon&&<span style={{display:'flex'}}>{icon}</span>}{children}</button>
  );
}

function FormField({label,type='text',value,onChange,options=[],placeholder,required,readOnly,hint,rows=3,min,max}) {
  const base = {
    width:'100%',fontFamily:'Inter,sans-serif',fontSize:14,fontWeight:400,color:C.text,
    border:`1px solid ${readOnly?C.surface:C.border}`,borderRadius:4,padding:'9px 12px',
    background:readOnly?C.surface:'#fff',outline:'none',letterSpacing:'-0.005em',boxSizing:'border-box',
  };
  return (
    <div style={{display:'flex',flexDirection:'column',gap:4}}>
      {label&&<label style={{fontSize:12,fontWeight:500,color:C.muted,letterSpacing:'-0.005em'}}>
        {label}{required&&<span style={{color:C.error}}> *</span>}
      </label>}
      {type==='select'?(
        <select value={value||''} onChange={e=>onChange&&onChange(e.target.value)} disabled={readOnly}
          style={{...base,height:40,appearance:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23757575' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:'no-repeat',backgroundPosition:'right 12px center',paddingRight:32}}>
          <option value="">— Select —</option>
          {options.map(o=><option key={o.v||o} value={o.v||o}>{o.l||o}</option>)}
        </select>
      ):type==='textarea'?(
        <textarea value={value||''} onChange={e=>onChange&&onChange(e.target.value)} rows={rows}
          placeholder={placeholder} readOnly={readOnly} style={{...base,resize:'vertical',lineHeight:'20px'}}/>
      ):type==='file'?(
        <div style={{border:`1px dashed ${C.border}`,borderRadius:4,padding:'10px 14px',
          background:readOnly?C.surface:'#fff',display:'flex',alignItems:'center',gap:10,cursor:readOnly?'default':'pointer'}}
          onClick={()=>!readOnly&&onChange&&onChange(label+'_doc.pdf')}>
          <Ic d={P.upload} s={16} c={C.muted} str sw={1.5}/>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:500,color:value?C.primaryDark:C.muted}}>{value||`Upload ${label||'File'}`}</div>
            <div style={{fontSize:11,color:C.muted}}>PDF only, max 20MB</div>
          </div>
          {value&&<div style={{display:'flex',gap:8}}>
            <Ic d={P.eye} s={15} c={C.primaryDark} str sw={1.5}/>
            <Ic d={P.download} s={15} c={C.primaryDark} str sw={1.5}/>
          </div>}
        </div>
      ):type==='radio'?(
        <div style={{display:'flex',gap:20,flexWrap:'wrap',paddingTop:4}}>
          {options.map(o=>(
            <label key={o.v||o} style={{display:'flex',alignItems:'center',gap:6,cursor:readOnly?'default':'pointer',fontSize:14,fontWeight:500,color:C.text}}>
              <input type="radio" value={o.v||o} checked={(value||'')===(o.v||o)}
                onChange={()=>!readOnly&&onChange&&onChange(o.v||o)} style={{accentColor:C.primary,width:14,height:14}}/>
              {o.l||o}
            </label>
          ))}
        </div>
      ):(
        <input type={type} value={value||''} onChange={e=>onChange&&onChange(e.target.value)}
          placeholder={placeholder} readOnly={readOnly} min={min} max={max}
          style={{...base,height:40}}/>
      )}
      {hint&&<span style={{fontSize:11,color:C.muted}}>{hint}</span>}
    </div>
  );
}

function Modal({open,onClose,title,children,width=580,footer}) {
  if(!open) return null;
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:'#fff',borderRadius:16,boxShadow:'0 8px 32px rgba(0,0,0,0.2)',width,maxWidth:'98%',maxHeight:'90vh',display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 24px 14px',borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <span style={{fontSize:16,fontWeight:700,color:C.text}}>{title}</span>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}>
            <Ic d={P.close} s={18} c={C.muted} str sw={1.5}/>
          </button>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}}>{children}</div>
        {footer&&<div style={{padding:'14px 24px',borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'flex-end',gap:10,flexShrink:0}}>{footer}</div>}
      </div>
    </div>
  );
}

function SectionBox({title,children,accent}) {
  const bodyPad={compact:10,standard:16,spacious:22}[window.TWEAKS?.density||'standard'];
  return (
    <div style={{border:`1px solid ${C.border}`,borderRadius:12,overflow:'hidden',marginBottom:16}}>
      <div style={{background:accent?C.primary:C.surface,padding:'9px 16px',borderBottom:`1px solid ${C.border}`}}>
        <span style={{fontSize:13,fontWeight:700,color:accent?'#fff':C.primaryDark,letterSpacing:'-0.005em'}}>{title}</span>
      </div>
      <div style={{padding:bodyPad}}>{children}</div>
    </div>
  );
}

function InfoBar({items}) {
  return (
    <div style={{background:'#fff',borderRadius:12,border:`1px solid ${C.border}`,padding:'12px 0',marginBottom:20,display:'flex',overflowX:'auto'}}>
      {items.map((item,i)=>(
        <div key={i} style={{flex:1,minWidth:130,padding:'0 20px',borderRight:i<items.length-1?`1px solid ${C.divider}`:'none'}}>
          <div style={{fontSize:11,color:C.muted,fontWeight:500,marginBottom:2}}>{item.label}</div>
          <div style={{fontSize:13,fontWeight:600,color:item.highlight?C.primary:C.text,lineHeight:1.3}}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function NhaiLogo({size='md'}) {
  const sm=size==='sm';
  return (
    <div style={{display:'flex',alignItems:'center',gap:sm?6:10}}>
      <svg width={sm?32:42} height={sm?21:28} viewBox="0 0 300.202 197.835" fill="none" style={{objectFit:'contain'}}>
        <g>
          <polyline fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" points="55.936,26.724 51.149,32.672 57.259,36.141 61.056,29.039"/>
          <polygon fill="none" stroke="#034EA2" stroke-width="0.202" stroke-miterlimit="2.613" points="55.936,26.724 51.149,32.672 57.259,36.141 61.056,29.039"/>
          <polyline fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" points="85.332,43.902 80.051,50.015 85.5,54.304 90.453,46.214"/>
          <polygon fill="none" stroke="#034EA2" stroke-width="0.202" stroke-miterlimit="2.613" points="85.332,43.902 80.051,50.015 85.5,54.304 90.453,46.214"/>
          <polyline fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" points="112.683,65.206 104.988,73.545 110.398,79.909 117.208,69.08"/>
          <polygon fill="none" stroke="#034EA2" stroke-width="0.202" stroke-miterlimit="2.613" points="112.683,65.206 104.988,73.545 110.398,79.909 117.208,69.08"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" d="M223.139,195.639c-59.25,3.316-118.499,0.829-177.749-5.634c61.589-19.223,96.469-46.417,95.115-79.849c-13.639-46.643-51.9-74.219-101.355-93.131l7.363-12.561c61.415,5.593,115.882,27.611,164.598,63.243c34.362,22.901,48.512,47.696,45.914,74.069C249.99,160.793,239.416,178.927,223.139,195.639"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" d="M127.375,84.707L0.743,110.099l-0.642,39.529c0.783,3.579,3.994,4.908,12.533,1.287l125.027-39.529l-6.106-26.679"/>
          <path fill="none" stroke="#034EA2" stroke-width="0.202" stroke-miterlimit="2.613" d="M127.375,84.707L0.743,110.099l-0.642,39.529c0.783,3.579,3.994,4.908,12.533,1.287l125.027-39.529l-6.106-26.679H127.375z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFF200" d="M154.345,190.089c20.301-25.15,27.71-47.54,29.33-68.684c1.016-13.331,0.384-20.788-5.438-32.782C157.733,46.42,110.085,20.864,44.185,8.655l-2.762,4.496c59.25,7.915,120.633,38.57,135.915,86.553c5.9,25.728-6.16,55.604-26.385,87.367C151.221,189.118,152.346,190.123,154.345,190.089"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" d="M34.723,188.549c160.784-44.27,106.382-127.525,2.672-168.75c-1.877-3.4-0.019-5.528,3.169-5.497c58.577,22.48,98.221,56.107,101.038,93.413c3.711,38.425-30.094,67.843-105.091,87.382C33.543,193.672,32.263,191.708,34.723,188.549"/>
          <path fill="none" stroke="#034EA2" stroke-width="0.202" stroke-miterlimit="2.613" d="M34.723,188.549c160.784-44.27,106.382-127.525,2.672-168.75c-1.877-3.4-0.019-5.528,3.169-5.497c58.577,22.48,98.221,56.107,101.038,93.413c3.711,38.425-30.094,67.843-105.091,87.382C33.543,193.672,32.263,191.708,34.723,188.549z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" d="M110.547,87.988c-18.949-26.595-46.756-47.646-80.28-62.292c-0.546-2.521-0.019-4.156,2.884-3.847c35.13,15.421,62.636,37.104,83.201,64.478"/>
          <path fill="none" stroke="#034EA2" stroke-width="0.202" stroke-miterlimit="2.613" d="M110.547,87.988c-18.949-26.595-46.756-47.646-80.28-62.292c-0.546-2.521-0.019-4.156,2.884-3.847c35.13,15.421,62.636,37.104,83.201,64.478L110.547,87.988z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#034EA2" d="M257.049,111.527c18.213,31.183,14.43,59.427-4.394,85.659h-11.574c19.871-19.153,26.963-41.229,18.598-66.506c-0.447-1.345-0.94-2.705-1.467-4.064c-0.228-2.949-0.455-5.902-0.683-8.854l-0.242-3.137 M224.218,196.785c23.396-25.632,35.401-47.888,36.227-66.476c0.25-5.703-0.54-11.055-2.382-16.059c-1.257-3.423-3.008-6.682-5.239-9.771c-1.904-2.64-4.145-5.107-6.285-7.549C201.147,45.343,136.164,10.581,47.476,0.103c-3.807,1.154-4.549,4.092-2.242,6.517c79.3,7.755,145.443,39.487,195.746,92.447c7.531,7.931,11.966,13.206,13.007,24.906c2.113,23.76-12.701,46.771-35.701,72.751C219.354,197.896,221.329,198.21,224.218,196.785z"/>
          <path fill="none" stroke="#034EA2" stroke-width="0.202" stroke-miterlimit="2.613" d="M257.049,111.527c18.213,31.183,14.43,59.427-4.394,85.659h-11.574c19.871-19.153,26.963-41.229,18.598-66.506c-0.447-1.345-0.94-2.705-1.467-4.064c-0.228-2.949-0.455-5.902-0.683-8.854l-0.242-3.137L257.049,111.527z M224.218,196.785c23.396-25.632,35.401-47.888,36.227-66.476c0.25-5.703-0.54-11.055-2.382-16.059c-1.257-3.423-3.008-6.682-5.239-9.771c-1.904-2.64-4.145-5.107-6.285-7.549C201.147,45.343,136.164,10.581,47.476,0.103c-3.807,1.154-4.549,4.092-2.242,6.517c79.3,7.755,145.443,39.487,195.746,92.447c7.531,7.931,11.966,13.206,13.007,24.906c2.113,23.76-12.701,46.771-35.701,72.751C219.354,197.896,221.329,198.21,224.218,196.785z"/>
        </g>
      </svg>
      <div>
        <div style={{fontSize:sm?9:10,fontWeight:500,color:'rgba(0,0,0,0.55)',lineHeight:1.2}}>NHAI</div>
        <div style={{fontSize:sm?12:15,fontWeight:700,color:'#000',letterSpacing:'-0.005em',lineHeight:1.1}}>DataLake 3.0</div>
      </div>
    </div>
  );
}

function AppHeader({role,setRole,onMenu,screen}) {
  const roles=['Contractor','AE/IE','RO','PD'];
  const initials={Contractor:'CK','AE/IE':'AE',RO:'RO',PD:'PD'}[role]||'US';
  return (
    <div style={{background:'#fff',height:60,boxShadow:'0 1px 2px rgba(0,0,0,0.12)',display:'flex',alignItems:'center',padding:'0 32px',gap:20,flexShrink:0,zIndex:50,position:'sticky',top:0}}>
      <button onClick={onMenu} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.menu} s={22} c={C.dark} str/></button>
      <NhaiLogo/>
      <div style={{display:'flex',alignItems:'center',gap:4,marginLeft:8,flexWrap:'wrap'}}>
        <Ic d={P.home} s={14} c={C.tabInactive} str/>
        <Ic d={P.chev} s={12} c='#9FB5CE' str sw={1.5}/>
        <span style={{fontSize:12,color:C.muted}}>Commissioning</span>
        <Ic d={P.chev} s={12} c='#9FB5CE' str sw={1.5}/>
        <span style={{fontSize:12,fontWeight:500,color:C.muted}}>Provisional Completion Certificate</span>
      </div>
      <div style={{flex:1}}/>
      <div style={{display:'flex',alignItems:'center',gap:6,background:'#FFF8E1',border:`1px solid #FFD54F`,borderRadius:8,padding:'4px 10px',fontSize:11}}>
        <span style={{color:'#F57F17',fontWeight:600}}>⚡ Prototype Role:</span>
        <select value={role} onChange={e=>setRole(e.target.value)} style={{border:'none',background:'transparent',fontSize:12,fontWeight:700,color:C.primaryDark,outline:'none',cursor:'pointer'}}>
          {roles.map(r=><option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <div style={{position:'relative',cursor:'pointer'}}><Ic d={P.bell} s={20} c={C.dark} str/><div style={{position:'absolute',top:-2,right:-2,width:8,height:8,borderRadius:'50%',background:C.error,border:'1.5px solid #fff'}}/></div>
        <Ic d={P.help} s={20} c={C.dark} str/>
        <div style={{width:32,height:32,borderRadius:'50%',background:C.primary,color:'#fff',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{initials}</div>
      </div>
    </div>
  );
}

const NAV_ITEMS=[
  {id:'dashboard',label:'Dashboard',icon:P.home},
  {id:'physical-progress',label:'Physical Progress',icon:'M18 20V10M12 20V4M6 20v-6',sec:'Reports'},
  {id:'dpr-deliverable',label:'DPR Deliverable',icon:P.doc,sec:null},
  {id:'pcc-pcod',label:'PCC / PCOD',icon:P.shield,sec:'Commissioning'},
  {id:'quality-plan',label:'QA Plan',icon:P.check,sec:null},
  {id:'quality-inspection',label:'QA Inspection',icon:P.filter,sec:null},
  {id:'land-handover',label:'Land Handover GIS',icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z',sec:'Land'},
  {id:'surplus-land',label:'Surplus Land',icon:P.list,sec:null},
  {id:'permits',label:'Applicable Permits',icon:P.doc,sec:'Other'},
];

function AppSidebar({open,onClose}) {
  let lastSec=null;
  return (
    <>
      {open&&<div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.3)',zIndex:199}}/>}
      <div style={{position:'fixed',left:0,top:0,height:'100vh',width:240,background:'#fff',
        boxShadow:'2px 0 12px rgba(0,0,0,0.12)',zIndex:200,display:'flex',flexDirection:'column',
        transform:open?'translateX(0)':'translateX(-100%)',transition:'transform 0.25s ease',overflowY:'auto'}}>
        <div style={{padding:'16px 20px',borderBottom:`1px solid ${C.divider}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <NhaiLogo size="sm"/>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'flex'}}><Ic d={P.close} s={16} c={C.muted} str sw={1.5}/></button>
        </div>
        <div style={{flex:1,padding:'8px 0'}}>
          {NAV_ITEMS.map(item=>{
            const showSec=item.sec&&item.sec!==lastSec;
            lastSec=item.sec||lastSec;
            const isAct=item.id==='pcc-pcod';
            return (
              <React.Fragment key={item.id}>
                {showSec&&<div style={{fontSize:9,fontWeight:700,color:'#B0BEC5',textTransform:'uppercase',letterSpacing:'0.1em',padding:'10px 20px 3px'}}>{item.sec}</div>}
                <div onClick={onClose} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',margin:isAct?'2px 10px':'2px 0',borderRadius:isAct?8:0,background:isAct?C.primary:'transparent',color:isAct?'#fff':C.dark,fontSize:13,fontWeight:isAct?600:500,letterSpacing:'-0.005em',cursor:'pointer',transition:'background 0.1s'}}>
                  <Ic d={item.icon} s={16} c={isAct?'#fff':C.dark} str sw={1.8}/>
                  {item.label}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div style={{padding:'12px 20px',borderTop:`1px solid ${C.divider}`,display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:C.primary,color:'#fff',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>CK</div>
          <div><div style={{fontSize:13,fontWeight:600,color:C.text}}>Chandra Kumar</div><div style={{fontSize:11,color:C.muted}}>Contractor · NH-52</div></div>
        </div>
      </div>
    </>
  );
}

function Tabs({items,active,onChange}) {
  return (
    <div style={{display:'flex',borderBottom:`1px solid ${C.border}`,background:'#fff',borderRadius:'12px 12px 0 0',paddingLeft:4,overflowX:'auto',flexShrink:0}}>
      {items.map(item=>(
        <div key={item} onClick={()=>onChange(item)} style={{padding:'11px 16px',fontSize:13,fontWeight:active===item?700:500,color:active===item?C.primaryDark:C.tabInactive,cursor:'pointer',position:'relative',letterSpacing:'-0.005em',whiteSpace:'nowrap',transition:'color 0.12s',flexShrink:0}}>
          {item}
          {active===item&&<div style={{position:'absolute',bottom:-1,left:0,right:0,height:2,background:C.primaryDark,borderRadius:'2px 2px 0 0'}}/>}
        </div>
      ))}
    </div>
  );
}

function DropMenu({options,onSelect}) {
  const [open,setOpen]=useState(false);
  const ref=useRef();
  useEffect(()=>{
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener('mousedown',h);
    return()=>document.removeEventListener('mousedown',h);
  },[]);
  return (
    <div ref={ref} style={{position:'relative',display:'inline-block'}}>
      <button onClick={()=>setOpen(!open)} style={{display:'flex',alignItems:'center',gap:4,background:C.primary,color:'#fff',border:'none',borderRadius:100,height:36,padding:'0 14px',fontSize:13,fontWeight:500,cursor:'pointer',letterSpacing:'-0.005em'}}>
        Action <Ic d={P.chevD} s={14} c='#fff' str sw={2}/>
      </button>
      {open&&(
        <div style={{position:'absolute',top:'calc(100% + 4px)',right:0,background:'#fff',borderRadius:10,boxShadow:'0 4px 16px rgba(0,0,0,0.15)',border:`1px solid ${C.border}`,minWidth:240,zIndex:100,overflow:'hidden'}}>
          {options.map((opt,i)=>(
            <div key={i} onClick={()=>{onSelect(opt.id);setOpen(false);}} style={{padding:'10px 16px',fontSize:13,fontWeight:500,color:opt.danger?C.error:C.primaryDark,cursor:'pointer',display:'flex',alignItems:'center',gap:8,borderBottom:i<options.length-1?`1px solid ${C.divider}`:'none',transition:'background 0.1s'}}
              onMouseEnter={e=>e.currentTarget.style.background=C.surface}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window,{C,P,Ic,Badge,Btn,FormField,Modal,SectionBox,InfoBar,NhaiLogo,AppHeader,AppSidebar,Tabs,DropMenu,STATUS_MAP});
