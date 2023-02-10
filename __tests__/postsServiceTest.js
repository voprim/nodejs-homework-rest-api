const {getPostById} = require('../src/services/postsService');
const {WrongParametersError} = require('../src/helpers/errors');
const {Post} = require('../src/db/postModel');

describe('Posts Service getPostById test', () => {
  it('should return post data by providen ID', async () => {
    const mPostId = '1';
    const mUserId = '2';

    const post = {
      _id: mPostId,
      topic: 'topic',
      userId: mUserId,
      text: 'text'
    };

    jest.spyOn(Post, 'findOne').mockImplementationOnce(async () => (post));

    const result = await getPostById(mPostId, mUserId);

    expect(result._id).toEqual(mPostId);
    expect(result.userId).toEqual(mUserId);
    expect(result.topic).toBeDefined();
    expect(result.text).toBeDefined();
  });
});
