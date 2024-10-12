import Tag from "../models/tags";

class TagService {
  async createTag(userId: string, name: string, color: string) {
    const existingTag = await Tag.findOne({ name: name, createdBy: userId });

    if (existingTag) {
      throw new Error("Já existe essa tag para esse usuário");
    }

    const newTag = new Tag({ name, color, createdBy: userId });

    await newTag.save();
  }

  async getAllTags(userId: string) {
    const tags = await Tag.find({ createdBy: userId });
    return tags;
  }

  async getTagById(id: string) {
    const tag = await Tag.findById(id);
    return tag;
  }

  async updateTag(
    id: string,
    userId: string,
    updateData: { name: string; color: string }
  ) {
    const tag = await Tag.findOne({ _id: id, createdBy: userId });

    if (!tag) {
      throw new Error("Tag não encontrada");
    }

    const updatedTag = await Tag.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedTag;
  }

  async deleteTag(id: string, userId: string) {
    const tag = await Tag.findOne({ _id: id, createdBy: userId });

    if (!tag) {
      throw new Error("Tag não encontrada");
    }

    await Tag.findByIdAndDelete(id);
  }
}

export default new TagService();
