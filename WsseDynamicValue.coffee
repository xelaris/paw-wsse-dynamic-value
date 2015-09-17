require "forge.bundle.js"

WsseDynamicValue = ->
  this.username = ""

  this.password = ""

  this.evaluate = ->
    time = (new Date()).toISOString()

    nonce = forge.util.bytesToHex forge.random.getBytesSync 10
    nonce64 = forge.util.encode64 nonce

    md = forge.md.sha1.create()
    md.update nonce + time + this.password
    digest = forge.util.encode64 md.digest().getBytes()

    "UsernameToken " +
      "Username=\"#{@username}\", " +
      "PasswordDigest=\"#{digest}\", " +
      "Nonce=\"#{nonce64}\", " +
      "Created=\"#{time}\"";

  @title = ->
    "WSSE"

  @text = ->
    @username

  return

WsseDynamicValue.identifier = "net.xelaris.PawExtensions.WsseDynamicValue"

WsseDynamicValue.title = "WSSE Dynamic Value"

WsseDynamicValue.inputs = [
  DynamicValueInput("username", "Username", "String"),
  DynamicValueInput("password", "Password", "String")
]

registerDynamicValueClass WsseDynamicValue
