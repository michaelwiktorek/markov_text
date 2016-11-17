# builds a markov chain based on input text
# then can generate output text or something

MarkovChain = require "./markov_chain.coffee"

class ChainManager
  @chain: null # our markov chain
  @text: null # string of text
  @k: null

  constructor: ->
    console.log("made new chain manager")

  # TODO make it cyclic
  build_chain: (text, k) ->
    console.log("constructed new chain")
    @chain = new MarkovChain()
    @text = text
    @k = parseInt(k, 10)
    for i in [0..text.length - 1]
      # k-gram and overlapping k-gram
      if i < (text.length - @k)
        key = text.substring(i, i + @k)
        value = text.substring(i + 1, i + @k + 1)
      else
        diff = (i + @k) - text.length
        key = text.substring(i, i + @k) + text.substring(0, diff)
        value = text.substring(i + 1, i + @k + 1) + text.substring(0, diff + 1)
      @chain.add_transition(key, value)

  # spit out text M characters long
  generate_text: (M) ->
    m = parseInt(M, 10)
    if not @chain?
      alert "try building a markov chain first"
      return ""
    state = @text.slice(0, @k)
    #@chain.print_neighbors(state)
    output = "" + state
    for i in [0..(m-@k-1)]
      state = @chain.next(state)
      if state == -1 or (not state?)
        return output
      output = output + @chain.last_char(state)
    return output


module.exports = ChainManager