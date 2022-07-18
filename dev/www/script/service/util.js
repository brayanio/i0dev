Service.Util.AsyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++)
        await callback(array[index], index, array)
}

Service.Util.AsyncMap = async (array, callback) => {
    let res = []
    await Service.Util.AsyncForEach(array, async (...p) => res.push(await callback(...p)))
    return res
}

Service.Util.Delay = n => new Promise(res => setTimeout(res, n))

i0.saveRoutes(true)