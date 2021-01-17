export const getValueForNextSequence = async (model, sequenceOfName) => {
    let sequenceDoc = await model.findOneAndUpdate({
        query: {_id: sequenceOfName },
        update: {$inc: { seq: 1 } },
        new: true
    });
    return sequenceDoc.seq;
}