const print = msg => console.log(msg)

/*
   Let's start from defining boolean values

   TRUE = λ x . λ y . x
   FALSE = λ x . λ y . y
*/
const TRUE = x => y => x
const FALSE = x => y => y


/*
  Boolean operators are used in context of
  conditional statements. Let's define that too.
*/
const IFELSE = cond => then => els => cond(then)(els)
const IF = cond => then => IFELSE(cond)(then)(() => null)

let ex1 =
  IF(TRUE)
    ( () => "true?" )

let ex2 =
  IF(FALSE)
    ( () => "true?" )

/*
  Boolean operators
*/
const NOT = a => a( FALSE )( TRUE )
const AND = a => b => a( b( TRUE ) ( FALSE ) )( FALSE )
const OR = a => b => a( TRUE )( b( TRUE )( FALSE ) )


const IFELSE_DEBUG = cond =>  IFELSE(cond)
                                ( () => "it's TRUE" )
                                ( () => "it's FALSE" )

let ex3 =
  IF(NOT(FALSE))
    ( () => "flipped FALSE to TRUE" )

let ex4 =
  IFELSE_DEBUG(FALSE)

let ex5 =
  IFELSE_DEBUG(AND(TRUE)(TRUE))

let ex6 =
  IFELSE_DEBUG(AND(TRUE)(FALSE))

let ex7 =
  IFELSE_DEBUG(OR(FALSE)(TRUE))

let ex8 =
  IFELSE_DEBUG(OR(FALSE)(FALSE))


/*

  To represent natural numbers let's use Church'es encoding
  https://en.wikipedia.org/wiki/Church_encoding

  ZERO = λ f . λ x . x
  ONE = λ f . λ x . f x
  TWO = λ f . λ x . f ( f x )
  THREE = λ f . λ x . f ( f ( f x ) )

  etc...

*/

const ZERO = f => x => x
const ONE = f => x => f( x )
const TWO = f => x => f( f( x ) )
const THREE = f => x => f( f( f( x ) ) )

/*

  This basically means apply some function "f" to an initial vlaue "x" n times,
  where n is the natural numbner

*/

const NUMBER_DEBUG = n => () => n(x => x + 1)(0)

let ex9 =
    NUMBER_DEBUG(THREE)

let ex10 = () => THREE( x => x - 1 )( 3 )


/*

  How can we find the sucessor (n + 1) of any natural number encoded with
  Church encoding?

  SUCC = λ n. λ f. λ x. f (n f x)

*/

const SUCC = n => f => x => f( n( f )( x ) )

/*
  3 + 1 + 1
*/
let ex11 =
  NUMBER_DEBUG( SUCC( SUCC( THREE ) ) )

/*

  Finding a predecessor (n - 1) is little bit more involved

  PRED = λ n . λ f . λ x . n (λ g . λ h . h (g f)) (λ u. x) (λ u . u)

*/

const PRED = n => f => x => n ( g => h => h( g ( f ) ) )  ( u => x ) ( u => u )


/*
  3 - 1 - 1
*/
let ex12 =
  NUMBER_DEBUG( PRED( PRED( THREE ) ) )


/*

  Natural numbers algebra

*/

const ADD = a => b => b( SUCC )( a )
const SUB = a => b => b( PRED )( a )
const MUL = a => b => f =>  a( b ( f ) )

let ex13 =
  NUMBER_DEBUG( ADD( THREE )( THREE ) )

let ex14 =
  NUMBER_DEBUG( SUB( THREE )( TWO ) )

// 3 * 3 * 3
let ex15 =
  NUMBER_DEBUG(
    MUL(
      MUL( THREE )( THREE ))
      ( THREE ) )

print("ex1: " + ex1())
print("ex2: " + ex2())
print("ex3: " + ex3())
print("ex4: " + ex4())
print("ex5: " + ex5())
print("ex6: " + ex6())
print("ex7: " + ex7())
print("ex8: " + ex8())
print("ex9: " + ex9())
print("ex10: " + ex10())
print("ex11: " + ex11())
print("ex12: " + ex12())
print("ex13: " + ex13())
print("ex14: " + ex14())
print("ex15: " + ex15())

/*

$ node main.js

ex1: true?
ex2: null
ex3: flipped FALSE to TRUE
ex4: it's FALSE
ex5: it's TRUE
ex6: it's FALSE
ex7: it's TRUE
ex8: it's FALSE
ex9: 3
ex10: 0
ex11: 5
ex12: 1
ex13: 6
ex14: 1
ex15: 27

*/
