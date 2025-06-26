import connectDB from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import { DEFAULT_CATEGORIES } from "@/app/lib/categories";

export async function POST() {
  try {
    await connectDB();
    
    // Check if categories already exist
    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
      return new Response(JSON.stringify({ 
        message: 'Categories already exist', 
        count: existingCategories.length 
      }), { status: 200 });
    }

    // Insert default categories
    const categories = await Category.insertMany(DEFAULT_CATEGORIES.map(cat => ({
      ...cat,
      description: `Default ${cat.name.toLowerCase()} category`,
      isActive: true
    })));

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Default categories created', 
      categories 
    }), { status: 201 });
    
  } catch (error) {
    console.error('Error seeding categories:', error);
    return new Response(JSON.stringify({ error: 'Failed to seed categories' }), { status: 500 });
  }
}
