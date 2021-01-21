export const getValueForNextSequence = async (model, sequenceOfName) => {
    let sequenceDoc = await model.findOneAndUpdate(
        {_id: sequenceOfName },
        {$inc: { seq: 1 } },
    );
    return sequenceDoc.seq;
}