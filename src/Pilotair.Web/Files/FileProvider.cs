using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Internal;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.Extensions.Primitives;
using Pilotair.Web.Projects;

namespace Pilotair.Web.Files;

public class FileProvider(IHttpContextAccessor contextAccessor) : IFileProvider
{
    private string? GetRootPath()
    {
        if (contextAccessor.HttpContext == default) return null;
        var projectContext = contextAccessor.HttpContext.RequestServices.GetRequiredService<ProjectContext>();
        return projectContext.Path;
    }

    public IDirectoryContents GetDirectoryContents(string subpath)
    {
        var rootPath = GetRootPath();
        subpath = subpath.TrimStart('/');
        if (Path.IsPathRooted(subpath) || rootPath == default)
        {
            return NotFoundDirectoryContents.Singleton;
        }

        string fullPath = Path.Combine(rootPath, Constants.FILES_FOLDER, subpath);
        if (!Directory.Exists(fullPath))
        {
            return NotFoundDirectoryContents.Singleton;
        }

        return new PhysicalDirectoryContents(fullPath);
    }

    public IFileInfo GetFileInfo(string subpath)
    {
        var rootPath = GetRootPath();
        subpath = subpath.TrimStart('/');
        if (Path.IsPathRooted(subpath) || rootPath == default)
        {
            return new NotFoundFileInfo(subpath);
        }

        string fullPath = Path.Combine(rootPath, Constants.FILES_FOLDER, subpath);

        if (!System.IO.File.Exists(fullPath))
        {
            return new NotFoundFileInfo(subpath);
        }

        var fileInfo = new FileInfo(fullPath);
        return new PhysicalFileInfo(fileInfo);
    }

    public IChangeToken Watch(string filter)
    {
        return NullChangeToken.Singleton;
    }
}