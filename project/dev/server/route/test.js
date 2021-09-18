if( body.random ) {
    console.log('test.random', body.max)
    return Service.Test.Random( body.max )
}
if( body.caps ) {
    console.log('test.caps', body.str)
    return Service.Test.Caps( body.str )
} 