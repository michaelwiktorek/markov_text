# markov chain class
# I guess it's a graph?
# maps k-grams to overlapping cyclic k-grams
# give it k-grams please (strings of length k)

class MarkovChain
  @dict: null

  constructor: ->
    console.log "making new markov chain"
    @dict = {}

  # add a transition between two k-grams
  add_transition: (v, w) ->
    @dict[v] ?= []
    @dict[v].push(w)
    @dict[w] ?= []

  # uniformly select a random neighbor
  next: (v) ->
    #console.log(v)
    len = @dict[v].length
    #console.log("len " + len)
    rand = Math.floor(Math.random() * len)
    #console.log("rand " + rand)
    return @dict[v][rand]

  print: ->
    console.log("keys: ")
    console.log(i) for i of @dict

  # get last character of state
  last_char: (v) ->
    return v.slice(-1)




module.exports = MarkovChain