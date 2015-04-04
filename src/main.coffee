ChainManager = require "./chain_manager.coffee"
manager = null

window.onload = ->
  manager = new ChainManager()
  document.querySelector("#start").onclick = build_chain
  document.querySelector("#print").onclick = build_text

build_chain = ->
  k_val = document.querySelector("#kval").value
  text = document.querySelector("#text").value
  manager.build_chain(text, k_val)

build_text = ->
  length = document.querySelector("#length").value
  output = manager.generate_text(length)
  div = document.querySelector("#output")
  div.innerHTML = output