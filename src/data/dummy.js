const umbrellas = [
    {
        "name": "cars",
        "color": "red",
        "buckets": ['nissan', 'dog-bone', 'topple']
    },
    {
        "name": "boats",
        "color": "green",
        "buckets": ['canniper', 'longhide', 'moonpie']
    },
    {
        "name": "planes",
        "color": "blue",
        "buckets": ['A380', 'Juicebox', 'Micro']
    }
]

const options = ['apple', 'banana', 'cake', 'doggie'].map((e, i) => {
    const out = {}
    out["label"] = out["value"] = e;
    const umbrella = out["umbrella"] = Object.keys(umbrellas)[i % 3]
    out["bucket"] = umbrellas[umbrella][e.length % 3]
    return out;
})

const disabledBuckets = [{'umbrella': 'cars', 'bucket': 'nissan'}]



export default { umbrellas, options, disabledBuckets }