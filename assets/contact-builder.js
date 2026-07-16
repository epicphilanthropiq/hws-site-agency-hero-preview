(() => {
const type=document.getElementById("contactType"), cards=[...document.querySelectorAll("[data-contact-type]")];
const groups={project:document.getElementById("projectFields"),support:document.getElementById("supportFields"),partner:document.getElementById("partnerFields"),guide:document.getElementById("guideFields")};
const labels={project:"Project Enquiry",support:"Product Support",partner:"Partnership Enquiry",guide:"Guided Recommendation"};
function choose(t){type.value=t;cards.forEach(c=>c.classList.toggle("active",c.dataset.contactType===t));Object.entries(groups).forEach(([k,e])=>e.hidden=k!==t);}
cards.forEach(c=>c.addEventListener("click",()=>choose(c.dataset.contactType)));
document.getElementById("guidedContactForm")?.addEventListener("submit",e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;
const t=type.value,n=document.getElementById("contactName").value.trim(),em=document.getElementById("contactEmail").value.trim(),b=document.getElementById("contactBusiness").value.trim(),l=document.getElementById("contactLocation").value.trim();let d="";
if(t==="project")d=`Service: ${document.getElementById("projectService").value}\nDesired outcome: ${document.getElementById("projectOutcome").value.trim()}`;
else if(t==="support")d=`Product: ${document.getElementById("supportProduct").value}\nIssue: ${document.getElementById("supportIssue").value.trim()}`;
else if(t==="partner")d=`Collaboration: ${document.getElementById("partnerType").value}\nProposal: ${document.getElementById("partnerProposal").value.trim()}`;
else d=`Goal: ${document.getElementById("guideGoal").value.trim()}\nPreferred support: ${document.getElementById("guideSupport").value}`;
const subject=`[HWS] ${labels[t]} — ${n}`,body=`Hello World Studio,\n\nName: ${n}\nEmail: ${em}\nBusiness/Organisation: ${b||"Not provided"}\nLocation: ${l||"Not provided"}\n\n${d}\n\nThank you.`;
document.getElementById("contactStatus").textContent="Your email draft is ready.";location.href=`mailto:helloworldstudiozw@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;});choose("project");})();