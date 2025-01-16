'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Config {
  profile: {
    name: string;
    description: string;
    avatar: string;
    social: {
      github: string;
      qq: string;
      wechat: string;
    };
  };
  settings: {
    title: string;
    description: string;
    favicon: string;
    adminPassword: string;
  };
  welcome: {
    title: string;
    description: string;
  };
  categories: Category[];
  sites: Site[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface Site {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  preview: string;
  category: string;
  tags: string[];
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 表单状态
  const [formData, setFormData] = useState<Config>({
    profile: {
      name: '',
      description: '',
      avatar: '',
      social: {
        github: '',
        qq: '',
        wechat: ''
      }
    },
    settings: {
      title: '',
      description: '',
      favicon: '',
      adminPassword: ''
    },
    welcome: {
      title: '',
      description: ''
    },
    categories: [],
    sites: []
  });

  // 新站点表单状态
  const [showSiteForm, setShowSiteForm] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [newSite, setNewSite] = useState<Site>({
    id: '',
    title: '',
    description: '',
    url: '',
    icon: '🌟',
    preview: '',
    category: 'public',
    tags: []
  });

  // 处理新标签输入
  const [newTag, setNewTag] = useState('');

  // 分类表单状态
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({
    id: '',
    name: '',
    icon: '🌟',
    description: ''
  });

  // 添加新标签
  const handleAddTag = (site: Site, tag: string) => {
    if (!tag.trim()) return;
    const updatedSite = {
      ...site,
      tags: [...site.tags, tag.trim()]
    };
    if (editingSite) {
      handleUpdateSite(updatedSite);
    } else {
      setNewSite(updatedSite);
    }
    setNewTag('');
  };

  // 删除标签
  const handleRemoveTag = (site: Site, tagToRemove: string) => {
    const updatedSite = {
      ...site,
      tags: site.tags.filter(tag => tag !== tagToRemove)
    };
    if (editingSite) {
      handleUpdateSite(updatedSite);
    } else {
      setNewSite(updatedSite);
    }
  };

  // 添加新站点
  const handleAddSite = () => {
    const siteWithId = {
      ...newSite,
      id: Date.now().toString()
    };
    setFormData(prev => ({
      ...prev,
      sites: [...prev.sites, siteWithId]
    }));
    setShowSiteForm(false);
    setNewSite({
      id: '',
      title: '',
      description: '',
      url: '',
      icon: '🌟',
      preview: '',
      category: 'public',
      tags: []
    });
  };

  // 更新站点
  const handleUpdateSite = (updatedSite: Site) => {
    setFormData(prev => ({
      ...prev,
      sites: prev.sites.map(site => 
        site.id === updatedSite.id ? updatedSite : site
      )
    }));
  };

  // 删除站点
  const handleDeleteSite = (siteId: string) => {
    if (confirm('确定要删除这个站点吗？')) {
      setFormData(prev => ({
        ...prev,
        sites: prev.sites.filter(site => site.id !== siteId)
      }));
    }
  };

  // 编辑站点
  const handleEditSite = (site: Site) => {
    setEditingSite(site);
    setNewSite(site);
    setShowSiteForm(true);
  };

  // 站点表单
  const SiteForm = ({ site, onSubmit, onCancel }: { site: Site; onSubmit: () => void; onCancel: () => void }) => (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-white/80">标题</label>
        <input
          type="text"
          value={site.title}
          onChange={(e) => setNewSite({ ...site, title: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="站点标题"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">描述</label>
        <textarea
          value={site.description}
          onChange={(e) => setNewSite({ ...site, description: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="站点描述"
          rows={3}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">URL</label>
        <input
          type="url"
          value={site.url}
          onChange={(e) => setNewSite({ ...site, url: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">图标</label>
        <input
          type="text"
          value={site.icon}
          onChange={(e) => setNewSite({ ...site, icon: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="输入emoji作为图标"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">预览图</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileChange('preview', e.target.files[0])}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">分类</label>
        <select
          value={site.category}
          onChange={(e) => setNewSite({ ...site, category: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
        >
          <option value="">选择分类</option>
          {formData.categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">标签</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {site.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-sm text-white flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(site, tag)}
                className="text-white/50 hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag(site, newTag)}
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
            placeholder="输入标签"
          />
          <button
            onClick={() => handleAddTag(site, newTag)}
            className="rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30"
          >
            添加
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30"
        >
          取消
        </button>
        <button
          onClick={onSubmit}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {editingSite ? '更新' : '添加'}
        </button>
      </div>
    </div>
  );

  // 添加新分类
  const handleAddCategory = () => {
    const categoryWithId = {
      ...newCategory,
      id: newCategory.id || Date.now().toString()
    };
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, categoryWithId]
    }));
    setShowCategoryForm(false);
    setNewCategory({
      id: '',
      name: '',
      icon: '🌟',
      description: ''
    });
  };

  // 更新分类
  const handleUpdateCategory = (updatedCategory: Category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    }));
  };

  // 删除分类
  const handleDeleteCategory = (categoryId: string) => {
    if (formData.sites.some(site => site.category === categoryId)) {
      alert('该分类下还有站点，无法删除');
      return;
    }
    if (confirm('确定要删除这个分类吗？')) {
      setFormData(prev => ({
        ...prev,
        categories: prev.categories.filter(category => category.id !== categoryId)
      }));
    }
  };

  // 编辑分类
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory(category);
    setShowCategoryForm(true);
  };

  // 分类表单
  const CategoryForm = ({ category, onSubmit, onCancel }: { category: Category; onSubmit: () => void; onCancel: () => void }) => (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-white/80">分类ID</label>
        <input
          type="text"
          value={category.id}
          onChange={(e) => setNewCategory({ ...category, id: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="分类ID（英文字母）"
          disabled={!!editingCategory}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">分类名称</label>
        <input
          type="text"
          value={category.name}
          onChange={(e) => setNewCategory({ ...category, name: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="分类名称"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">图标</label>
        <input
          type="text"
          value={category.icon}
          onChange={(e) => setNewCategory({ ...category, icon: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="输入emoji作为图标"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-white/80">描述</label>
        <textarea
          value={category.description}
          onChange={(e) => setNewCategory({ ...category, description: e.target.value })}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
          placeholder="分类描述"
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30"
        >
          取消
        </button>
        <button
          onClick={onSubmit}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {editingCategory ? '更新' : '添加'}
        </button>
      </div>
    </div>
  );

  // 加载配置
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to load config:', error);
        setIsLoading(false);
      });
  }, []);

  const handleLogin = () => {
    if (password === formData.settings.adminPassword) {
      setIsLoggedIn(true);
    } else {
      alert('密码错误');
    }
  };

  // 处理输入变化
  const handleInputChange = (section: 'profile' | 'settings' | 'welcome', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // 处理社交链接变化
  const handleSocialChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        social: {
          ...prev.profile.social,
          [field]: value
        }
      }
    }));
  };

  // 处理文件上传
  const handleFileChange = async (field: string, file: File) => {
    // 这里应该实现文件上传逻辑
    console.log(`Uploading ${field}:`, file);
  };

  // 保存更改
  const handleSave = async () => {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save config');
      }

      alert('保存成功！');
    } catch (error) {
      console.error('Save failed:', error);
      alert('保存失败，请重试');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white/10 p-8 backdrop-blur-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-white">后台管理登录</h1>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入管理密码"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? '加载中...' : '登录'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold text-white">后台管理</h1>
        
        {/* 个人信息设置 */}
        <section className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">个人信息设置</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">名称</label>
              <input
                type="text"
                value={formData.profile.name}
                onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="输入你的名称"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">简介</label>
              <textarea
                value={formData.profile.description}
                onChange={(e) => handleInputChange('profile', 'description', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="输入个人简介"
                rows={3}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">头像</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange('avatar', e.target.files[0])}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
              />
            </div>
          </div>
        </section>

        {/* 社交链接设置 */}
        <section className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">社交链接设置</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">GitHub</label>
              <input
                type="text"
                value={formData.profile.social.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="GitHub 链接"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">QQ</label>
              <input
                type="text"
                value={formData.profile.social.qq}
                onChange={(e) => handleSocialChange('qq', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="QQ 号码"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">微信二维码</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange('wechat', e.target.files[0])}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
              />
            </div>
          </div>
        </section>

        {/* 站点设置 */}
        <section className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">站点设置</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">网站标题</label>
              <input
                type="text"
                value={formData.settings.title}
                onChange={(e) => handleInputChange('settings', 'title', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="输入网站标题"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">网站描述</label>
              <textarea
                value={formData.settings.description}
                onChange={(e) => handleInputChange('settings', 'description', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="输入网站描述"
                rows={3}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">网站图标</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange('favicon', e.target.files[0])}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
              />
            </div>
          </div>
        </section>

        {/* 欢迎设置 */}
        <section className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">欢迎设置</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">欢迎标题</label>
              <input
                type="text"
                value={formData.welcome.title}
                onChange={(e) => handleInputChange('welcome', 'title', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="输入欢迎标题"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">欢迎描述</label>
              <textarea
                value={formData.welcome.description}
                onChange={(e) => handleInputChange('welcome', 'description', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="输入欢迎描述"
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* 分类管理 */}
        <section className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">分类管理</h2>
          <div className="space-y-4">
            {!showCategoryForm && (
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setNewCategory({
                    id: '',
                    name: '',
                    icon: '🌟',
                    description: ''
                  });
                  setShowCategoryForm(true);
                }}
                className="rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30"
              >
                添加新分类
              </button>
            )}

            {showCategoryForm && (
              <CategoryForm
                category={newCategory}
                onSubmit={() => {
                  if (editingCategory) {
                    handleUpdateCategory(newCategory);
                    setEditingCategory(null);
                  } else {
                    handleAddCategory();
                  }
                  setShowCategoryForm(false);
                }}
                onCancel={() => {
                  setShowCategoryForm(false);
                  setEditingCategory(null);
                }}
              />
            )}

            {/* 分类列表 */}
            <div className="space-y-4">
              {formData.categories.map(category => (
                <div
                  key={category.id}
                  className="rounded-lg bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="text-lg font-bold text-white">{category.name}</h3>
                        <span className="text-sm text-white/50">({category.id})</span>
                      </div>
                      <p className="mt-2 text-white/80">{category.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="rounded-lg bg-white/20 px-3 py-1 text-sm text-white hover:bg-white/30"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="rounded-lg bg-red-500/20 px-3 py-1 text-sm text-white hover:bg-red-500/30"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 导航站点管理 */}
        <section className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">导航站点管理</h2>
          <div className="space-y-4">
            {!showSiteForm && (
              <button
                onClick={() => {
                  setEditingSite(null);
                  setNewSite({
                    id: '',
                    title: '',
                    description: '',
                    url: '',
                    icon: '🌟',
                    preview: '',
                    category: 'public',
                    tags: []
                  });
                  setShowSiteForm(true);
                }}
                className="rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30"
              >
                添加新站点
              </button>
            )}

            {showSiteForm && (
              <SiteForm
                site={newSite}
                onSubmit={() => {
                  if (editingSite) {
                    handleUpdateSite(newSite);
                    setEditingSite(null);
                  } else {
                    handleAddSite();
                  }
                  setShowSiteForm(false);
                }}
                onCancel={() => {
                  setShowSiteForm(false);
                  setEditingSite(null);
                }}
              />
            )}

            {/* 站点列表 */}
            <div className="space-y-4">
              {formData.sites.map(site => (
                <div
                  key={site.id}
                  className="rounded-lg bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{site.icon}</span>
                        <h3 className="text-lg font-bold text-white">{site.title}</h3>
                      </div>
                      <p className="mt-2 text-white/80">{site.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {site.tags.map(tag => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSite(site)}
                        className="rounded-lg bg-white/20 px-3 py-1 text-sm text-white hover:bg-white/30"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteSite(site.id)}
                        className="rounded-lg bg-red-500/20 px-3 py-1 text-sm text-white hover:bg-red-500/30"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 密码设置 */}
        <section className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">密码设置</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">管理密码</label>
              <input
                type="password"
                value={formData.settings.adminPassword}
                onChange={(e) => handleInputChange('settings', 'adminPassword', e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none"
                placeholder="输入新的管理密码"
              />
              <p className="mt-2 text-sm text-white/50">修改后需要使用新密码重新登录</p>
            </div>
          </div>
        </section>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            保存更改
          </button>
        </div>
      </div>
    </div>
  );
} 