let events = require("events");
let Audit = require("../modules/Audit/audit.model");

let emitter = new events.EventEmitter();

const audit = class Audit {
  constructor(auditAction, data, status, error, auditBy, auditOn) {
    this.auditAction = auditAction,
      this.data = data,
      this.status = status,
      this.error = error,
      this.auditBy = auditBy,
      this.auditOn = auditOn
  }
}

const auditEvent = "audit"

emitter.on(auditEvent, async (audit) => {
  let form = {
    auditOn: audit.auditOn,
    auditBy: audit.auditBy,
    auditData: JSON.stringify(audit.data),
    auditStatus: audit.status,
    auditAction: audit.auditAction,
    errorMessage: audit.error
  }
  const newAudit = new Audit(form);
  await newAudit.save();

})


exports.prepareAudit = (auditAction, data, error, auditBy, auditOn) => {
  let status = 200
  if (error)
    status = 500

  let auditObj = new audit(auditAction, data, status, error, auditBy, auditOn)
  emitter.emit(auditEvent, auditObj)
}